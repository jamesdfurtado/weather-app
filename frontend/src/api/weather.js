import api from './axios';

/* ---------- auth ---------- */
export const signUp = (userData) => api.post('/auth/signup', userData);
export const signIn = (userData) => api.post('/auth/signin', userData);

/* ---------- current weather ---------- */
export const fetchWeatherByCity = (city) =>
  api.get(`/weather?city=${encodeURIComponent(city)}`);

/* ---------- saved locations ---------- */
export const saveLocation = (username, location) =>
  api.post('/locations/save', { username, location });

export const getSavedLocations = (username) =>
  api.get(`/locations/user/${encodeURIComponent(username)}`);

export const deleteLocation = (username, location) =>
  api.delete('/locations/delete', {
    data: { username, location },
  });
