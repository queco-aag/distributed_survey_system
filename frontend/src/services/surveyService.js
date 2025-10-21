import api from './api';

const surveyService = {
  getAllSurveys: async () => {
    const response = await api.get('/surveys');
    return response.data;
  },

  getActiveSurveys: async () => {
    const response = await api.get('/surveys/active');
    return response.data;
  },

  getSurveyById: async (id) => {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  },

  getSurveysByType: async (type) => {
    const response = await api.get(`/surveys/type/${type}`);
    return response.data;
  },

  createSurvey: async (survey) => {
    const response = await api.post('/surveys', survey);
    return response.data;
  },

  updateSurvey: async (id, survey) => {
    const response = await api.put(`/surveys/${id}`, survey);
    return response.data;
  },

  deleteSurvey: async (id) => {
    const response = await api.delete(`/surveys/${id}`);
    return response.data;
  },
};

export default surveyService;
