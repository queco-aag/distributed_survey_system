# Pull Request #3 Review - Add validation to ensure all surveys contain at least one question

## Review Date
October 21, 2025

## Summary
This review examines the changes made in PR #3, which added validation to ensure all surveys contain at least one question. While the overall intent is good, several issues were identified and fixed.

## Issues Found

### 1. Critical Bug: Questions Not Updated in `updateSurvey` Method
**Severity:** Critical  
**Status:** ✅ Fixed

**Description:**  
The `updateSurvey` method in `SurveyService.java` was not updating the questions list from the provided `surveyDetails` parameter. The method only updated basic survey properties (title, description, type, dates, active status) but completely ignored the questions list. This meant:
- Questions could never be updated through the update endpoint
- The validation was checking the OLD questions, not the NEW ones from the update request
- This could lead to inconsistent data and unexpected behavior

**Original Code (Lines 42-55):**
```java
public Survey updateSurvey(Long id, Survey surveyDetails) {
    Survey survey = surveyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Survey not found"));
    
    survey.setTitle(surveyDetails.getTitle());
    survey.setDescription(surveyDetails.getDescription());
    survey.setType(surveyDetails.getType());
    survey.setStartDate(surveyDetails.getStartDate());
    survey.setEndDate(surveyDetails.getEndDate());
    survey.setActive(surveyDetails.isActive());
    
    validateSurveyQuestions(survey); // Validates OLD questions!
    return surveyRepository.save(survey);
}
```

**Fix Applied:**
```java
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
    
    validateSurveyQuestions(survey); // Now validates NEW questions
    return surveyRepository.save(survey);
}
```

**Test Added:**
A new test `testUpdateSurvey_UpdatesQuestionsFromSurveyDetails` was added to verify that questions are properly updated.

### 2. Code Quality: Duplicate Validation
**Severity:** Medium  
**Status:** ✅ Fixed

**Description:**  
The validation was implemented in two places:
1. Bean Validation annotation `@NotEmpty` on the `questions` field in `Survey.java` (line 55)
2. Manual validation in `SurveyService.validateSurveyQuestions()` method

This duplication is problematic because:
- The `@NotEmpty` annotation only works when `@Valid` is used, which creates inconsistent behavior
- Having two validation mechanisms is confusing and harder to maintain
- The manual validation in the service layer is more appropriate for business logic validation

**Fix Applied:**
Removed the `@NotEmpty` annotation and its import from `Survey.java`, keeping only the service-level validation which is more appropriate for business logic validation.

## Changes Made

### Modified Files
1. **src/main/java/com/survey/system/service/SurveyService.java**
   - Added code to update the questions list in `updateSurvey` method
   - Now properly clears and replaces questions with the new ones from `surveyDetails`

2. **src/main/java/com/survey/system/model/Survey.java**
   - Removed `@NotEmpty` annotation from `questions` field
   - Removed unused `jakarta.validation.constraints.NotEmpty` import

3. **src/test/java/com/survey/system/service/SurveyServiceTest.java**
   - Added new test: `testUpdateSurvey_UpdatesQuestionsFromSurveyDetails`
   - This test verifies that questions are properly updated when calling `updateSurvey`

## Test Results
✅ All tests passing (7 tests total)
- `testCreateSurvey_WithQuestions_Success`
- `testCreateSurvey_WithoutQuestions_ThrowsException`
- `testCreateSurvey_WithNullQuestions_ThrowsException`
- `testUpdateSurvey_WithQuestions_Success`
- `testUpdateSurvey_WithoutQuestions_ThrowsException`
- `testUpdateSurvey_UpdatesQuestionsFromSurveyDetails` (new)

## Build Status
✅ Clean compilation successful  
✅ All tests passing  
✅ No security vulnerabilities detected (CodeQL scan)

## Security Summary
No security vulnerabilities were introduced or found in the changes. The CodeQL security scan completed successfully with 0 alerts.

## Recommendations

### Current Implementation
The current validation approach (service-level) is appropriate for this use case because:
- It provides business logic validation
- It gives better control over error messages
- It's easier to test and maintain
- It's consistent across all service methods

### Future Improvements (Optional)
Consider these enhancements for future iterations:
1. Add more descriptive error messages that include context (survey ID, title, etc.)
2. Consider using a custom exception hierarchy for different types of validation errors
3. Add validation for other business rules (e.g., minimum/maximum number of questions, question types, etc.)
4. Consider adding an audit log for survey updates to track question changes

## Conclusion
The original PR #3 implementation had good intentions but contained a critical bug that prevented questions from being updated. This review identified and fixed:
- ✅ Critical bug in `updateSurvey` method
- ✅ Duplicate validation logic
- ✅ Added comprehensive test coverage

All changes have been tested and verified. The code now works as intended and follows best practices for service-level validation.
