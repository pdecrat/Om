import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Spaces from '/imports/api/Spaces/Spaces';

const addBlock = ({ origin, data, target }) => {
  const { name } = data;
  if (target.blocks[name]) {
    throw new Meteor.Error(
      'effect:add-block:block-already-present',
      "The block you're trying to add is already in this space"
    )
  }
  const block = Blocks.findOne({ name });
  if (!block) {
    throw new Meteor.Error(
      'effect:add-block:block-not-found',
      "The block you are trying to add cannot be found"
    )
  }
  target.blocks[name] = block.content;
}
addBlock.dataSchema = new SimpleSchema({
  name: {
    type: String
  }
})
Actions.registerEffect('addBlock', addBlock);

Actions.add({
  name: 'addBlock',
  effects: {
    addBlock: true
  }
})
