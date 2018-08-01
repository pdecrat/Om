import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Spaces from '/imports/api/Spaces/Spaces';

Meteor.startup(() => {
  // Meteor.users.remove({});
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
        'test7',
        'test11',
        'test12',
        'test14',
        'test13',
        'test15',
      ]
    });
  }
  Spaces.remove({});
  if (Spaces.find().count() === 0) {
    Spaces.insert({
      name: 'om',
      blocks: {
        'BlockManager': {
          category: 'configuration'
        },
        'SpaceCreator': {
          category: 'om'
        },
      }
    })
  }
})
