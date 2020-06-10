import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('pushAtIndex', {
  fn({
    data: { index = 0, toPush = '' },
    target,
    options: { fieldName }
  }) {
    console.log(index)
    const array = target[fieldName];
    if (array.length <= 1) {
      return;
    }

    const i = array.findIndex(value => value === toPush);
    array.splice(i, 1);
    array.splice(index, 0, toPush);
    target[fieldName] = array;
  },
  dataSchema() {
    return new SimpleSchema({
      toPush: {
        type: String
      },
      index: {
        type: Number,
        min: 0
      },
    })
  }
})
