import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import target from './target';
import { blocks } from '/imports/blocks/blocks-index';

const mainReducer = combineReducers({
  ui,
  user,
  target,
  blocks,
});

export default mainReducer;
