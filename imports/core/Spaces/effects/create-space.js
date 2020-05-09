import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Spaces from '/imports/core/Spaces/Spaces';

const dataSchema =
Actions.registerEffect('createSpace', {
  fn({ data: { name = '' } }) {
    if (name.length < 2) {
      throw new Meteor.Error(
        'effects:create-space:name-too-short',
        "The space's name must be at least 3 characters long."
      )
    }
    const _id = Spaces.insert({ name })
  },
  dataSchema: new SimpleSchema({
    name: {
      type: String
    },
  })
});
