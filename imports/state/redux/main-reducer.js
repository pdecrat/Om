import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import space from './space';
import blocks from './blocks';
import spaces from './spaces';

const mainReducer = combineReducers({
  ui,
  user,
  space,
  spaces,
  blocks,
});

export default mainReducer;
