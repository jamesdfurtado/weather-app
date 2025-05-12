import api from './axios';

export const signUp = (userData) => api.post('/auth/signup', userData);
export const signIn = (userData) => api.post('/auth/signin', userData);
export const verifyLogin = (data) => api.post('/auth/verify-login', data);

