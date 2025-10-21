package com.survey.system.service;

import com.survey.system.exception.SurveyValidationException;
import com.survey.system.model.Question;
import com.survey.system.model.Survey;
import com.survey.system.model.SurveyType;
import com.survey.system.repository.SurveyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SurveyServiceTest {

    @Mock
    private SurveyRepository surveyRepository;

    @InjectMocks
    private SurveyService surveyService;

    private Survey validSurvey;
    private Survey invalidSurvey;

    @BeforeEach
    void setUp() {
        validSurvey = new Survey();
        validSurvey.setTitle("Test Survey");
        validSurvey.setDescription("Test Description");
        validSurvey.setType(SurveyType.OPEN);
        validSurvey.setActive(true);

        Question question = new Question();
        question.setText("Test Question");
        validSurvey.getQuestions().add(question);

        invalidSurvey = new Survey();
        invalidSurvey.setTitle("Invalid Survey");
        invalidSurvey.setDescription("No questions");
        invalidSurvey.setType(SurveyType.OPEN);
        invalidSurvey.setActive(true);
        invalidSurvey.setQuestions(new ArrayList<>());
    }

    @Test
    void testCreateSurvey_WithQuestions_Success() {
        when(surveyRepository.save(any(Survey.class))).thenReturn(validSurvey);

        Survey result = surveyService.createSurvey(validSurvey);

        assertNotNull(result);
        assertEquals("Test Survey", result.getTitle());
        verify(surveyRepository, times(1)).save(any(Survey.class));
    }

    @Test
    void testCreateSurvey_WithoutQuestions_ThrowsException() {
        SurveyValidationException exception = assertThrows(
            SurveyValidationException.class,
            () -> surveyService.createSurvey(invalidSurvey)
        );

        assertEquals("Una encuesta debe contener al menos una pregunta", exception.getMessage());
        verify(surveyRepository, never()).save(any(Survey.class));
    }

    @Test
    void testCreateSurvey_WithNullQuestions_ThrowsException() {
        invalidSurvey.setQuestions(null);

        SurveyValidationException exception = assertThrows(
            SurveyValidationException.class,
            () -> surveyService.createSurvey(invalidSurvey)
        );

        assertEquals("Una encuesta debe contener al menos una pregunta", exception.getMessage());
        verify(surveyRepository, never()).save(any(Survey.class));
    }

    @Test
    void testUpdateSurvey_WithQuestions_Success() {
        Long surveyId = 1L;
        Survey existingSurvey = new Survey();
        existingSurvey.setId(surveyId);
        existingSurvey.setTitle("Old Title");
        Question question = new Question();
        question.setText("Existing Question");
        existingSurvey.getQuestions().add(question);

        when(surveyRepository.findById(surveyId)).thenReturn(Optional.of(existingSurvey));
        when(surveyRepository.save(any(Survey.class))).thenReturn(existingSurvey);

        Survey result = surveyService.updateSurvey(surveyId, validSurvey);

        assertNotNull(result);
        assertEquals("Test Survey", result.getTitle());
        verify(surveyRepository, times(1)).findById(surveyId);
        verify(surveyRepository, times(1)).save(any(Survey.class));
    }

    @Test
    void testUpdateSurvey_WithoutQuestions_ThrowsException() {
        Long surveyId = 1L;
        Survey existingSurvey = new Survey();
        existingSurvey.setId(surveyId);
        existingSurvey.setTitle("Old Title");
        existingSurvey.setQuestions(new ArrayList<>());

        when(surveyRepository.findById(surveyId)).thenReturn(Optional.of(existingSurvey));

        SurveyValidationException exception = assertThrows(
            SurveyValidationException.class,
            () -> surveyService.updateSurvey(surveyId, invalidSurvey)
        );

        assertEquals("Una encuesta debe contener al menos una pregunta", exception.getMessage());
        verify(surveyRepository, times(1)).findById(surveyId);
        verify(surveyRepository, never()).save(any(Survey.class));
    }

    @Test
    void testUpdateSurvey_UpdatesQuestionsFromSurveyDetails() {
        Long surveyId = 1L;
        Survey existingSurvey = new Survey();
        existingSurvey.setId(surveyId);
        existingSurvey.setTitle("Old Title");
        Question oldQuestion = new Question();
        oldQuestion.setText("Old Question");
        existingSurvey.getQuestions().add(oldQuestion);

        Survey updatedDetails = new Survey();
        updatedDetails.setTitle("New Title");
        updatedDetails.setDescription("New Description");
        updatedDetails.setType(SurveyType.OPEN);
        Question newQuestion = new Question();
        newQuestion.setText("New Question");
        updatedDetails.getQuestions().add(newQuestion);

        when(surveyRepository.findById(surveyId)).thenReturn(Optional.of(existingSurvey));
        when(surveyRepository.save(any(Survey.class))).thenReturn(existingSurvey);

        Survey result = surveyService.updateSurvey(surveyId, updatedDetails);

        assertNotNull(result);
        assertEquals(1, result.getQuestions().size());
        assertEquals("New Question", result.getQuestions().get(0).getText());
        verify(surveyRepository, times(1)).findById(surveyId);
        verify(surveyRepository, times(1)).save(any(Survey.class));
    }
}
