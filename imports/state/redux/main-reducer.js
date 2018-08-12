import { combineReducers } from 'redux';

import ui from './ui/ui';
import user from './user';
import space from './space';
import { blocks } from '/imports/blocks/blocks-index';

const mainReducer = combineReducers({
  ui,
  user,
  space,
  blocks,
});

export default mainReducer;
