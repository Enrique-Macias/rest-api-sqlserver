const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const endpoints = {
  items: `${API_URL}/items`,
  login: `${API_URL}/login`,
  // Agrega más endpoints según necesites
};

export default API_URL; 