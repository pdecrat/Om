import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/api/Spaces/Spaces';
import { Collections, Collection } from '/imports/api/Collections';

Meteor.startup(() => {
  const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  Spaces.find().forEach(space => {
    db.dropCollection(space.reference);
  });
  Spaces.remove({})
  if (Spaces.find().count() === 0) {
    const omId = Spaces.insert({
      name: 'om',
      type: 'space',
    });
    Collections.get("om").insert({
      parent: "om",
      type: "action",
      name: "register user",
      effects: {
        register: true
      }
    })
    Collections.get("om").insert({
      parent: "om",
      isActive: true,
      type: "block",
      blockType: "user-icon",
      block: "User",
    })
  }
})
