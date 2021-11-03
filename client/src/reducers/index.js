import { combineReducers } from 'redux';

import experiences from './experiences';
import auth from './auth';

export const reducers = combineReducers({ experiences, auth });
