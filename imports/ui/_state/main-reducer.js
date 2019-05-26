import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import context from './context';

const mainReducer = combineReducers({
  ui,
  user,
  context,
});

export default mainReducer;
