import { combineReducers } from 'redux';

import MenuTester from './content/MenuTester';
import ModalTester from './content/ModalTester';
import SpaceCreator from './content/SpaceCreator';
import ActionDispatcher from './content/ActionDispatcher';
import DataList from './content/DataList';
import Paragraph from './content/Paragraph';

import Grid from './layout/Grid';
import Feed from './layout/Feed';
import FullScreen from './layout/FullScreen';

import User from './icons/User';

const Blocks = {
  MenuTester,
  ModalTester,
  SpaceCreator,
  ActionDispatcher,
  DataList,
  Paragraph,
  User,
  Grid,
  Feed,
  FullScreen,
}
export default Blocks;
