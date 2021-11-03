import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getExperiences = () => async (dispatch) => {
  try {
    const { data } = await api.fetchExperiences();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createExperience = (experience) => async (dispatch) => {
  try {
    const { data } = await api.createExperience(experience);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateExperience = (id, experience) => async (dispatch) => {
  try {
    const { data } = await api.updateExperience(id, experience);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    await api.deleteExperience(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};