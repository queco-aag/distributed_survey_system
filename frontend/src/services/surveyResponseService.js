import api from './api';

const surveyResponseService = {
  submitSurveyResponse: async (surveyResponse) => {
    const response = await api.post('/survey-responses', surveyResponse);
    return response.data;
  },

  getAllSurveyResponses: async () => {
    const response = await api.get('/survey-responses');
    return response.data;
  },

  getSurveyResponsesBySurveyId: async (surveyId) => {
    const response = await api.get(`/survey-responses/survey/${surveyId}`);
    return response.data;
  },

  getSurveyResponsesByUserId: async (userId) => {
    const response = await api.get(`/survey-responses/user/${userId}`);
    return response.data;
  },

  getSurveyResponseById: async (id) => {
    const response = await api.get(`/survey-responses/${id}`);
    return response.data;
  },
};

export default surveyResponseService;
