import { combineReducers } from 'redux';

import app from './app/app';

const mainReducer = combineReducers({
  app,
});

export default mainReducer;
