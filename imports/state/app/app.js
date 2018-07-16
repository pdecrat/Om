import { combineReducers } from 'redux';

import modal from './modal';
import menu from './menu';
import space from './space';

const app = combineReducers({
  modal,
  menu,
  space,
});

export default app;
