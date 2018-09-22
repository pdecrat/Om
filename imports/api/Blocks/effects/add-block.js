import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Blocks from '/imports/api/Blocks/Blocks';
import Collections from '/imports/api/Collections';

const addBlock = ({ origin, data, target }) => {
  const { name } = data;
  const block = Blocks.findOne({ name });
  if (!block) {
    throw new Meteor.Error(
      'effect:add-block:block-not-found',
      "The block you are trying to add cannot be found"
    )
  }
  const newBlock = {
    ...block.content,
    parentId: target._id,
    type: 'block',
    name: block.name,
    isActive: true,
  }
  Collections.get(target._id).insert(newBlock);
}
addBlock.dataSchema = new SimpleSchema({
  name: {
    type: String
  }
})
Actions.registerEffect('addBlock', addBlock);
