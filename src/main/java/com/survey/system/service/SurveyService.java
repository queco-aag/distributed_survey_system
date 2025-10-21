package com.survey.system.service;

import com.survey.system.exception.SurveyValidationException;
import com.survey.system.model.Survey;
import com.survey.system.model.SurveyType;
import com.survey.system.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    public Survey createSurvey(Survey survey) {
        validateSurveyQuestions(survey);
        return surveyRepository.save(survey);
    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public List<Survey> getSurveysByType(SurveyType type) {
        return surveyRepository.findByType(type);
    }

    public List<Survey> getActiveSurveys() {
        return surveyRepository.findByActive(true);
    }

    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    public Survey updateSurvey(Long id, Survey surveyDetails) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found"));
        
        survey.setTitle(surveyDetails.getTitle());
        survey.setDescription(surveyDetails.getDescription());
        survey.setType(surveyDetails.getType());
        survey.setStartDate(surveyDetails.getStartDate());
        survey.setEndDate(surveyDetails.getEndDate());
        survey.setActive(surveyDetails.isActive());
        
        // Update questions
        survey.getQuestions().clear();
        if (surveyDetails.getQuestions() != null) {
            survey.getQuestions().addAll(surveyDetails.getQuestions());
        }
        
        validateSurveyQuestions(survey);
        return surveyRepository.save(survey);
    }

    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }
    
    private void validateSurveyQuestions(Survey survey) {
        if (survey.getQuestions() == null || survey.getQuestions().isEmpty()) {
            throw new SurveyValidationException("Una encuesta debe contener al menos una pregunta");
        }
    }
}
