import { Meteor } from 'meteor/meteor';

import { Collections } from '/imports/api/Collections';

Meteor.startup(() => {
  Collections['spaces'].remove({});
  // Collections.remove({});
  if (Collections['spaces'].find({}).count() === 0) {
    Collections['spaces'].insert({
      name: 'Om',
      blocks: [
        'ModalTester',
        'MenuTester',
        'CollectionList',
        'CollectionTester',
      ]
    });
  }
})
