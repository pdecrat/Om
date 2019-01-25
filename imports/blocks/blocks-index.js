import { combineReducers } from 'redux';

import MenuTester from './content/MenuTester';
import ModalTester from './content/ModalTester';
import SpaceCreator from './content/SpaceCreator';
import ActionDispatcher from './content/ActionDispatcher';
import DataList from './content/DataList';
import Paragraph from './content/Paragraph';

import TaskList from './content/TaskList/TaskList';

import BlockManager from './content/BlockManager/BlockManager';
import blockManager from './content/BlockManager/blocks-redux'

import Grid from './layout/Grid';
import Feed from './layout/Feed';
import FullScreen from './layout/FullScreen';

import User from './icons/User';

const Blocks = {
  MenuTester,
  ModalTester,
  SpaceCreator,
  BlockManager,
  ActionDispatcher,
  DataList,
  Paragraph,
  TaskList,
  User,
  Grid,
  Feed,
  FullScreen,
}
export default Blocks;

export const blocks = combineReducers({
  blockManager,
})
