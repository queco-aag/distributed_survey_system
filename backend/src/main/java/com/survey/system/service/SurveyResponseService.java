package com.survey.system.service;

import com.survey.system.model.SurveyResponse;
import com.survey.system.repository.SurveyResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SurveyResponseService {

    @Autowired
    private SurveyResponseRepository surveyResponseRepository;

    public SurveyResponse submitSurveyResponse(SurveyResponse surveyResponse) {
        return surveyResponseRepository.save(surveyResponse);
    }

    public List<SurveyResponse> getAllSurveyResponses() {
        return surveyResponseRepository.findAll();
    }

    public List<SurveyResponse> getSurveyResponsesBySurveyId(Long surveyId) {
        return surveyResponseRepository.findBySurveyId(surveyId);
    }

    public List<SurveyResponse> getSurveyResponsesByUserId(Long userId) {
        return surveyResponseRepository.findByUserId(userId);
    }

    public Optional<SurveyResponse> getSurveyResponseById(Long id) {
        return surveyResponseRepository.findById(id);
    }
}
