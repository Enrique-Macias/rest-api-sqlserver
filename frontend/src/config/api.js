const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const endpoints = {
  items: `${API_URL}/items`,
  login: `${API_URL}/login`,
  register: `${API_URL}/login/register`,
  mongoItems: `${API_URL}/mongo-items`
};

export default API_URL; 
