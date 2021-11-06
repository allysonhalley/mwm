import { FETCH_ALL, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, experiences: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, experiences: action.payload.data };
    case CREATE:
      return { ...state, experiences: [...state.experiences, action.payload] };
    case UPDATE:
      return { ...state, experiences: state.experiences.map((experience) => (experience._id === action.payload._id ? action.payload : experience)) };
    case DELETE:
      return { ...state, experiences: state.experiences.filter((experience) => experience._id !== action.payload) };
    default:
      return state;
  }
};
