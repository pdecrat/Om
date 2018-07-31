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
        'om',
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
        'test11',
        'test12',
        'test13',
        'test14',
        'test15',
        'test15654',
        'test1765',
        'test7',
      ]
    });
  }
  Spaces.remove({});
  if (Spaces.find().count() === 0) {
    Spaces.insert({
      name: 'om',
      blocks: [
        'MenuTester',
        'BlockManager',
        'ModalTester',
        'SpaceCreator',
        'BlockManager',
        'SpaceCreator',
        'ModalTester',
        'ModalTester',
        'BlockManager',
        'SpaceCreator',
        'ModalTester',
        'SpaceCreator',
        'BlockManager',
      ]
    })
  }
})
