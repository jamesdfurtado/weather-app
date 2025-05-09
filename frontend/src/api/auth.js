import api from './axios';

export const signUp = (userData) => {
  return api.post('/auth/signup', userData);
};

export const signIn = (userData) => {
  return api.post('/auth/signin', userData);
};
