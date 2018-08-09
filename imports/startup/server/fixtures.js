import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/api/Spaces/Spaces';
import Actions from '/imports/api/Actions';

Meteor.startup(() => {
  Actions.remove({})
  if (Spaces.find().count() === 0) {
    Spaces.insert({
      name: 'om',
      type: 'space',
      blocks: {
        'BlockManager': {
          category: 'configuration'
        },
        'SpaceCreator': {
          category: ''
        },
        'ModalTester': {
          category: 'test'
        },
        'MenuTester': {
          category: 'test'
        },
      }
    })
  }
})
