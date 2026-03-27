import axios from 'axios';

const API_BASE = 'http://localhost:8081/api/scenario';

export const api = {
  startScenario: async (prompt) => {
    const response = await axios.post(`${API_BASE}/start`, { prompt });
    return response.data;
  },
  
  nextStep: async (scenarioId, selectedOption) => {
    const response = await axios.post(`${API_BASE}/next`, { 
      scenarioId, 
      selectedOption 
    });
    return response.data;
  },
  
  getResult: async (scenarioId) => {
    const response = await axios.get(`${API_BASE}/result/${scenarioId}`);
    return response.data;
  }
};
