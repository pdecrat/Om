import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Collections } from '/imports/api/Collections';

Meteor.startup(() => {
  // Collections.remove({});
  Collections['spaces'].remove({});
  if (Collections['spaces'].find({}).count() === 0) {
    Collections['spaces'].insert({
      name: 'Om',
      blocks: [
        'ModalTester',
        'MenuTester',
        'CollectionList',
        // 'CollectionTester',
      ]
    });
  }
  if (Collections['users'].find({}).count() === 0) {
    Accounts.createUser({
      username: 'admin',
      password: 'alpaga',
      spaces: [
        'Om'
      ]
    });
  }
})
