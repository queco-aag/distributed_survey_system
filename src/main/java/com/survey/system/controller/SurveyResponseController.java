package com.survey.system.controller;

import com.survey.system.model.SurveyResponse;
import com.survey.system.service.SurveyResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/survey-responses")
@CrossOrigin(origins = "*")
public class SurveyResponseController {

    @Autowired
    private SurveyResponseService surveyResponseService;

    @PostMapping
    public ResponseEntity<SurveyResponse> submitSurveyResponse(@RequestBody SurveyResponse surveyResponse) {
        SurveyResponse savedResponse = surveyResponseService.submitSurveyResponse(surveyResponse);
        return ResponseEntity.ok(savedResponse);
    }

    @GetMapping
    public ResponseEntity<List<SurveyResponse>> getAllSurveyResponses() {
        return ResponseEntity.ok(surveyResponseService.getAllSurveyResponses());
    }

    @GetMapping("/survey/{surveyId}")
    public ResponseEntity<List<SurveyResponse>> getSurveyResponsesBySurveyId(@PathVariable Long surveyId) {
        return ResponseEntity.ok(surveyResponseService.getSurveyResponsesBySurveyId(surveyId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SurveyResponse>> getSurveyResponsesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(surveyResponseService.getSurveyResponsesByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyResponse> getSurveyResponseById(@PathVariable Long id) {
        return surveyResponseService.getSurveyResponseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
