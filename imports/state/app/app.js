import { combineReducers } from 'redux';

import modal from './modal';
import menu from './menu';

const app = combineReducers({
  modal,
  menu,
});

export default app;
