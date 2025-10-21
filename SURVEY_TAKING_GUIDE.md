# Survey Taking Feature - User Guide

## Overview

The survey taking feature allows users to fill out and submit survey responses through an intuitive web interface. Each question is displayed with appropriate input controls based on its type.

## Features

### Supported Question Types

1. **Single Choice (SINGLE_CHOICE)**
   - Displays radio buttons
   - User can select only one answer
   - Example: "How would you rate your experience?"

2. **Multiple Choice (MULTIPLE_CHOICE)**
   - Displays checkboxes
   - User can select multiple answers
   - Example: "Which features do you use? (Select all that apply)"

3. **True/False (TRUE_FALSE)**
   - Displays radio buttons with two options
   - User selects between two choices (typically Yes/No or True/False)
   - Example: "Would you recommend our service to a friend?"

### User Interface

- **Clean Layout**: Questions are displayed in individual cards for easy reading
- **Question Numbers**: Each question is numbered sequentially
- **Required Indicators**: Required questions are marked with a red asterisk (*)
- **Helper Text**: Each question shows hint text about expected answer format
- **Progress Feedback**: Loading spinners during data fetching and submission
- **Validation**: Ensures all required questions are answered before submission
- **Toast Notifications**: Success and error messages appear as toast notifications

## How to Use

### For End Users

1. **Access Surveys**
   - Log in to the application
   - Navigate to the "Surveys" page

2. **Start a Survey**
   - Find the survey you want to take
   - Click the green "Responder" (Take Survey) button

3. **Answer Questions**
   - Read each question carefully
   - Note which questions are required (marked with *)
   - For single choice: Click one radio button
   - For multiple choice: Check all boxes that apply
   - For true/false: Select your answer

4. **Submit Response**
   - Click "Enviar Respuestas" (Submit Answers)
   - System validates all required questions are answered
   - If validation fails, you'll see a warning message
   - Upon success, you'll see a confirmation and be redirected to the survey list

5. **Cancel**
   - Click "Cancelar" to return to survey list without submitting

## Technical Implementation

### Component Structure

```
TakeSurvey
├── Survey Header (title, description)
├── Questions Container
│   ├── Question Card 1
│   │   ├── Question Text
│   │   ├── Helper Text
│   │   └── Answer Options (radio/checkbox)
│   ├── Question Card 2
│   └── ...
└── Action Buttons (Submit, Cancel)
```

### Data Flow

1. Load survey details and questions from API
2. Initialize answer state for all questions
3. User interacts with answer options
4. State updates on each selection
5. Validation on submit button click
6. POST response to `/api/survey-responses`
7. Show success message and redirect

### API Integration

**GET Survey**: `GET /api/surveys/{id}`
- Retrieves survey metadata

**GET Questions**: `GET /api/questions/survey/{surveyId}`
- Retrieves all questions and answer options for the survey

**POST Response**: `POST /api/survey-responses`
- Submits the completed survey response

```json
{
  "survey": { "id": 1 },
  "user": { "id": 1 },
  "questionResponses": [
    {
      "question": { "id": 1 },
      "selectedOptions": [
        { "id": 1 }
      ]
    }
  ]
}
```

## Validation Rules

- **Required Questions**: Must have at least one option selected
- **Optional Questions**: Can be left unanswered
- **Submit Button**: Disabled when no questions exist or while submitting

## Error Handling

- **Survey Not Found**: Shows warning message with back button
- **Questions Loading Error**: Displays error message
- **Submission Error**: Shows error toast notification
- **Network Issues**: Gracefully handles connection problems

## Accessibility

- Proper HTML semantic elements (labels, inputs)
- Keyboard navigation support
- Screen reader friendly
- Clear error messages
- Focus management

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design works on mobile and desktop

## Future Enhancements

Potential improvements for future versions:
- Save draft functionality
- Progress bar showing completion percentage
- Previous/Next buttons for multi-page surveys
- Timer for timed surveys
- File upload question type
- Text input question type
- Rating scale question type
- Matrix questions

## Troubleshooting

**Problem**: Survey doesn't load
- Check network connection
- Verify you're logged in
- Ensure survey ID is valid

**Problem**: Can't submit response
- Verify all required questions are answered
- Check for error messages in toast notifications
- Try refreshing the page

**Problem**: Answers not saving
- Check browser console for errors
- Verify backend server is running
- Ensure proper authentication token

## Support

For issues or questions, please contact the system administrator or refer to the main project documentation.
