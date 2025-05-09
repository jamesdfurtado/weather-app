import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Works with setupProxy.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
