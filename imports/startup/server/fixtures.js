import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Spaces from '/imports/api/Spaces/Spaces';

Meteor.startup(() => {
  Meteor.users.remove({});
  if (Meteor.users.find({}).count() === 0) {
    Accounts.createUser({
      username: 'admin',
      password: 'alpaga',
      spaces: [
        'om'
      ]
    });
  }
  Spaces.remove({});
  Spaces.insert({
    name: 'om',
    blocks: [
      'MenuTester',
      'ModalTester',
      'SpaceCreator',
    ]
  })
})
