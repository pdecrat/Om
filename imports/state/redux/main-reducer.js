import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import space from './space';

const mainReducer = combineReducers({
  ui,
  user,
  space,
});

export default mainReducer;
