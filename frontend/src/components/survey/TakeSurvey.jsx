import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import surveyService from '../../services/surveyService';
import surveyResponseService from '../../services/surveyResponseService';
import { useAuth } from '../../contexts/AuthContext';
import './Survey.css';

function TakeSurvey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useRef(null);
  
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSurvey();
  }, [id]);

  const loadSurvey = async () => {
    try {
      setLoading(true);
      setError(null);
      const surveyData = await surveyService.getSurveyById(id);
      setSurvey(surveyData);
      
      // Load questions for this survey
      const response = await fetch(`http://localhost:8080/api/questions/survey/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      const questionsData = await response.json();
      setQuestions(questionsData);
      
      // Initialize answers object
      const initialAnswers = {};
      questionsData.forEach(q => {
        if (q.type === 'MULTIPLE_CHOICE') {
          initialAnswers[q.id] = [];
        } else {
          initialAnswers[q.id] = null;
        }
      });
      setAnswers(initialAnswers);
    } catch (error) {
      console.error('Error loading survey:', error);
      setError('Error al cargar la encuesta. Por favor, intente nuevamente.');
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cargar la encuesta',
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSingleChoiceChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleMultipleChoiceChange = (questionId, optionId, checked) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionId]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(id => id !== optionId)
        };
      }
    });
  };

  const validateAnswers = () => {
    for (const question of questions) {
      if (question.required) {
        const answer = answers[question.id];
        if (answer === null || answer === undefined || 
            (Array.isArray(answer) && answer.length === 0)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, responda todas las preguntas obligatorias',
        life: 3000,
      });
      return;
    }

    try {
      setSubmitting(true);

      // Build the survey response object
      const questionResponses = questions.map(question => {
        const answer = answers[question.id];
        const selectedOptions = [];

        if (question.type === 'MULTIPLE_CHOICE') {
          // For multiple choice, answer is an array of option IDs
          answer.forEach(optionId => {
            selectedOptions.push({ id: optionId });
          });
        } else if (answer !== null) {
          // For single choice and true/false, answer is a single option ID
          selectedOptions.push({ id: answer });
        }

        return {
          question: { id: question.id },
          selectedOptions: selectedOptions
        };
      });

      const surveyResponse = {
        survey: { id: parseInt(id) },
        user: { id: user.id },
        questionResponses: questionResponses
      };

      await surveyResponseService.submitSurveyResponse(surveyResponse);

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Encuesta enviada correctamente',
        life: 3000,
      });

      // Redirect to surveys list after 2 seconds
      setTimeout(() => {
        navigate('/surveys');
      }, 2000);
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo enviar la encuesta',
        life: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderAnswerOptions = (question) => {
    switch (question.type) {
      case 'SINGLE_CHOICE':
        return (
          <div className="flex flex-column gap-2">
            {question.answerOptions.map(option => (
              <div key={option.id} className="flex align-items-center">
                <RadioButton
                  inputId={`option-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                  onChange={() => handleSingleChoiceChange(question.id, option.id)}
                  checked={answers[question.id] === option.id}
                />
                <label htmlFor={`option-${option.id}`} className="ml-2">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );

      case 'MULTIPLE_CHOICE':
        return (
          <div className="flex flex-column gap-2">
            {question.answerOptions.map(option => (
              <div key={option.id} className="flex align-items-center">
                <Checkbox
                  inputId={`option-${option.id}`}
                  value={option.id}
                  onChange={(e) => handleMultipleChoiceChange(question.id, option.id, e.checked)}
                  checked={answers[question.id]?.includes(option.id) || false}
                />
                <label htmlFor={`option-${option.id}`} className="ml-2">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );

      case 'TRUE_FALSE':
        return (
          <div className="flex flex-column gap-2">
            {question.answerOptions.map(option => (
              <div key={option.id} className="flex align-items-center">
                <RadioButton
                  inputId={`option-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                  onChange={() => handleSingleChoiceChange(question.id, option.id)}
                  checked={answers[question.id] === option.id}
                />
                <label htmlFor={`option-${option.id}`} className="ml-2">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Message severity="error" text={error} />
        <Button 
          label="Volver" 
          icon="pi pi-arrow-left" 
          onClick={() => navigate('/surveys')} 
          className="mt-3"
        />
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-4">
        <Message severity="warn" text="Encuesta no encontrada" />
        <Button 
          label="Volver" 
          icon="pi pi-arrow-left" 
          onClick={() => navigate('/surveys')} 
          className="mt-3"
        />
      </div>
    );
  }

  return (
    <div className="take-survey p-4">
      <Toast ref={toast} />
      
      <Card className="mb-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">{survey.title}</h2>
          {survey.description && (
            <p className="text-gray-600">{survey.description}</p>
          )}
        </div>

        {questions.length === 0 ? (
          <Message severity="info" text="Esta encuesta no tiene preguntas aún" />
        ) : (
          <div className="questions-container">
            {questions.map((question, index) => (
              <Card key={question.id} className="mb-4">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold mb-2">
                    {index + 1}. {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {question.type === 'SINGLE_CHOICE' && '(Seleccione una opción)'}
                    {question.type === 'MULTIPLE_CHOICE' && '(Seleccione una o más opciones)'}
                    {question.type === 'TRUE_FALSE' && '(Verdadero o Falso)'}
                  </span>
                </div>
                {renderAnswerOptions(question)}
              </Card>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button
            label="Enviar Respuestas"
            icon="pi pi-check"
            onClick={handleSubmit}
            disabled={submitting || questions.length === 0}
            loading={submitting}
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            onClick={() => navigate('/surveys')}
            disabled={submitting}
          />
        </div>
      </Card>
    </div>
  );
}

export default TakeSurvey;
