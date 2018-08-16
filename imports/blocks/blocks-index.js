import { combineReducers } from 'redux';

import MenuTester from './MenuTester';
import ModalTester from './ModalTester';
import SpaceCreator from './SpaceCreator';
import NotFound from './NotFound';

import BlockManager from './BlockManager/BlockManager';
import blockManager from './BlockManager/blocks-redux'

import TaskList from './TaskList/TaskList';

const Blocks = {
  MenuTester,
  ModalTester,
  SpaceCreator,
  BlockManager,
  NotFound,
  TaskList,
}
export default Blocks;

export const blocks = combineReducers({
  blockManager,
})
