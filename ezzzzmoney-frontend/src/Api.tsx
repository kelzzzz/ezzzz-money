import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const helloWorldService = {
  getHello: () => api.get('/hello'),
};

export const authService = {
  login: (email: string, password: string) => 
    api.post('/api/auth/login', { email, password }),
};

export default api;