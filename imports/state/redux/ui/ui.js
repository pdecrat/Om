import { combineReducers } from 'redux';

import modal from './modal';
import menu from './menu';

const ui = combineReducers({
  modal,
  menu,
});

export default ui;
