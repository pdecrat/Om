import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Spaces from '/imports/api/Spaces/Spaces';

const removeBlock = ({ data, target }) => {
  if (target.name === 'BlockManager') {
    throw new Meteor.Error(
      'effects:remove-block:cannot-remove-self',
      "Mh, better not remove this one..."
    )
  }
  target.isActive = false;
}
Actions.registerEffect('removeBlock', removeBlock)
Actions.add({
  name: 'removeBlock',
  effects: {
    removeBlock: true,
  }
})
