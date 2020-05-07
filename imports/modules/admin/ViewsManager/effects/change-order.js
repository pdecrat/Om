import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

const changeOrder = ({
  data: { direction = '' },
  target: { viewOrder, _id, root, viewId }
}) => {
  if (direction === 'up') {
    Data.update({
      viewId,
      root,
      viewOrder: viewOrder - 1
    }, { $inc: { viewOrder: 1 } })
    Data.update({
      _id,
      root
    }, { $inc: { viewOrder: -1 } })
  } else {
    Data.update({
      viewId,
      root,
      viewOrder: viewOrder + 1
    }, { $inc: { viewOrder: -1 } })
    Data.update({
      _id,
      root
    }, { $inc: { viewOrder: 1 } })
  }
}
changeOrder.dataSchema = new SimpleSchema({
  direction: {
    type: String
  },
})
Actions.registerEffect('changeOrder', changeOrder)
