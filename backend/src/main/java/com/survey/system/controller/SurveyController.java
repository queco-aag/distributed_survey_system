package com.survey.system.controller;

import com.survey.system.exception.SurveyValidationException;
import com.survey.system.model.Survey;
import com.survey.system.model.SurveyType;
import com.survey.system.service.SurveyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "*")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        return ResponseEntity.ok(surveyService.getAllSurveys());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Survey>> getActiveSurveys() {
        return ResponseEntity.ok(surveyService.getActiveSurveys());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Survey>> getSurveysByType(@PathVariable SurveyType type) {
        return ResponseEntity.ok(surveyService.getSurveysByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createSurvey(@Valid @RequestBody Survey survey) {
        try {
            Survey createdSurvey = surveyService.createSurvey(survey);
            return ResponseEntity.ok(createdSurvey);
        } catch (SurveyValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSurvey(@PathVariable Long id, @Valid @RequestBody Survey survey) {
        try {
            Survey updatedSurvey = surveyService.updateSurvey(id, survey);
            return ResponseEntity.ok(updatedSurvey);
        } catch (SurveyValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.ok().build();
    }
}
