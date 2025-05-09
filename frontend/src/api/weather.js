import api from './axios';

export const signUp = (userData) => {
  return api.post('/auth/signup', userData);
};

export const signIn = (userData) => {
  return api.post('/auth/signin', userData);
};

export const fetchWeatherByCity = (city) => {
  return api.get(`/weather?city=${city}`);
};

export const saveLocation = (username, location) => {
  return api.post('/locations', { username, location });
};

export const getSavedLocations = (username) => {
  return api.get(`/locations?username=${username}`);
};

export const deleteLocation = (username, location) => {
  return api.delete('/locations', {
    data: { username, location },
  });
};
