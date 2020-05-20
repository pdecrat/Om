import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('changeOrder', {
  fn({
    data: { direction = '' },
    target: { _id, root, viewId }
  }) {
    const { order = [] } = Data.findOne({ root, _id: viewId });

    if (order.length <= 1) {
        order.push(_id);
        return;
    }

    const i = order.findIndex(value => value === _id);
    if (direction === 'up' && i > 0) {
      [order[i], order[i - 1]] = [order[i - 1], order[i]]
    } else if (direction === 'down' && i < order.length - 1) {
      [order[i], order[i + 1]] = [order[i + 1], order[i]]
    }
    Data.update({ _id: viewId, root, }, { $set: { order } })
  },
  dataSchema() {
    return new SimpleSchema({
      direction: {
        type: String
      },
    })
  }
})
