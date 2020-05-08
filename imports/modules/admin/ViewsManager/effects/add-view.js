import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

const addView = ({ data: { name }, target }) => {

  if (name.length < 2) {
    throw new Meteor.Error(
      'effects:create-view:name-too-short',
      "The view's name must be at least 3 characters long."
    )
  }
  const _id = Data.insert({
    name,
    type: 'view',
    root: target._id,
    isActive: true,
    isPublic: true,
  })
}
addView.dataSchema = new SimpleSchema({
  name: {
    type: String
  },
})
Actions.registerEffect('addView', addView)
