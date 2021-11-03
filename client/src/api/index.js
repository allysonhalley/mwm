import axios from 'axios';

// const API = axios.create({ baseURL: 'https://my-wine-memories.herokuapp.com/' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchExperiences = () => API.get('/experiences');
export const createExperience = (newExperience) => API.post('/experiences', newExperience);
export const updateExperience = (id, updatedExperience) => API.patch(`/experiences/${id}`, updatedExperience);
export const deleteExperience = (id) => API.delete(`/experiences/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
