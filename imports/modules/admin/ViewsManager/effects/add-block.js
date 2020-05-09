import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('addBlock', {
  fn({ data: { name = 'Paragraph', viewOrder }, target }) {
    Data.insert({
      name,
      viewOrder,
      type: 'block',
      blockType: 'content',
      root: target.root,
      viewId: target._id,
      isActive: true,
      isPublic: true,
    })
  },
  dataSchema: new SimpleSchema({
    name: {
      type: String
    },
    viewOrder: {
      type: Number
    }
  })
});
