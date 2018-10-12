import { combineReducers } from 'redux';

import MenuTester from './MenuTester';
import ModalTester from './ModalTester';
import SpaceCreator from './SpaceCreator';
import Grid from './Grid';
import FullScreen from './FullScreen';

import BlockManager from './BlockManager/BlockManager';
import blockManager from './BlockManager/blocks-redux'

import TaskList from './TaskList/TaskList';
import User from './Users/User';

const Blocks = {
  MenuTester,
  ModalTester,
  SpaceCreator,
  BlockManager,
  TaskList,
  User,
  Grid,
  FullScreen,
}
export default Blocks;

export const blocks = combineReducers({
  blockManager,
})
