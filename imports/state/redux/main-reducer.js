import { combineReducers } from 'redux';

import ui from './ui/ui';
import space from './space';
import collections from './collections';
import user from './user';

const mainReducer = combineReducers({
  ui,
  space,
  collections,
  user,
});

export default mainReducer;
