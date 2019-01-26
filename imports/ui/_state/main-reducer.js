import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import context from './context';
import { blocks } from '/imports/blocks/blocks-index';

const mainReducer = combineReducers({
  ui,
  user,
  context,
  blocks,
});

export default mainReducer;
