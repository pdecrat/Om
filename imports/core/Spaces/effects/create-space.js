import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Spaces from '/imports/core/Spaces/Spaces';

const createSpace = ({ origin, data }) => {
  const { space } = data;

  if (space.name.length < 2) {
    throw new Meteor.Error(
      'effects:create-space:name-too-short',
      "The space's name must be at least 3 characters long."
    )
  }
  const _id = Spaces.insert({
    ...space,
    type: 'space',
  })
  if (origin)
    origin.spaces.push(space.name);
}
createSpace.dataSchema = new SimpleSchema({
  space: {
    type: Object
  },
  'space.name': {
    type: String
  },
})
Actions.registerEffect('createSpace', createSpace)
