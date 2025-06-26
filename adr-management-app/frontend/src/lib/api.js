import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API des ADR
export const adrApi = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return apiClient.get(`/adrs?${params.toString()}`);
  },
  
  getById: (id) => apiClient.get(`/adrs/${id}`),
  
  create: (adrData) => apiClient.post('/adrs', adrData),
  
  update: (id, adrData) => apiClient.put(`/adrs/${id}`, adrData),
  
  approve: (id) => apiClient.post(`/adrs/${id}/approve`),
  
  reject: (id) => apiClient.post(`/adrs/${id}/reject`),
  
  delete: (id) => apiClient.delete(`/adrs/${id}`),
};

// API des utilisateurs
export const userApi = {
  login: (credentials) => apiClient.post('/users/login', credentials),
  
  getCurrentUser: () => apiClient.get('/users/me'),
  
  getAll: () => apiClient.get('/users'),
  
  getById: (id) => apiClient.get(`/users/${id}`),
  
  create: (userData) => apiClient.post('/users', userData),
  
  update: (id, userData) => apiClient.put(`/users/${id}`, userData),
  
  delete: (id) => apiClient.delete(`/users/${id}`),
};

export default apiClient;

