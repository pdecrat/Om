import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Spaces from '/imports/api/Spaces/Spaces';

const createSpace = ({ origin, data }) => {
  const { space } = data;
  const _id = Spaces.insert({
    ...space,
    blocks: {
      'BlockManager': {
        category: 'configuration'
      }
    }
  })
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

Actions.add({
  name: 'createSpace',
  effects: {
    createSpace: true,
  },
})
