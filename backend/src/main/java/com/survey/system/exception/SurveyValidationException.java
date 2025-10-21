package com.survey.system.exception;

public class SurveyValidationException extends RuntimeException {
    
    public SurveyValidationException(String message) {
        super(message);
    }
    
    public SurveyValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
