import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Spaces from '/imports/api/Spaces/Spaces';

const removeBlock = ({ data, target }) => {
  const { name } = data;
  if (!target.blocks[name]) {
    throw new Meteor.Error(
      "effects:remove-block:block-absent",
      "The block you're trying to remove cannot be found"
    )
  }

  delete target.blocks[name];
}
removeBlock.dataSchema = new SimpleSchema({
  name: {
    type: String
  }
})
Actions.registerEffect('removeBlock', removeBlock)
Actions.add({
  name: 'removeBlock',
  effects: {
    removeBlock: true,
  }
})
