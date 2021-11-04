import axios from 'axios';

// const API = axios.create({ baseURL: 'https://my-wine-memories.herokuapp.com/' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchExperiences = () => API.get('/experience');
export const createExperience = (newExperience) => API.post('/experience/add', newExperience);
export const updateExperience = (id, updatedExperience) => API.patch(`/experience/${id}`, updatedExperience);
export const deleteExperience = (id) => API.delete(`/experience/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
