import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/api/Spaces/Spaces';
import { Collections, Collection } from '/imports/api/Collections';

Meteor.startup(() => {
  const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  const collections = db.listCollections()
  collections.forEach(({ name }) => {
    if (name !== "passwordless_pending_credentials"
      && name !== "users"
      && name !== "meteor_accounts_loginServiceConfiguration"
      && name !== "spaces"
    )
      // db.dropCollection(name);
      Collections.add(name)
  })

  // Spaces.find().forEach(space => {
  // });
  // Meteor.users.find().forEach(user => {
  //   db.dropCollection(user._id);
  // });
  // Meteor.users.remove({});
  // Spaces.remove({})
  if (Spaces.find().count() === 0) {
    const omId = Spaces.insert({
      name: 'om',
    });
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "register user",
      effects: {
        register: true
      }
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "createSpace",
      effects: {
        createSpace: true
      }
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "user-icon",
      name: "User",
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "interface",
      name: "Default",
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "view",
      name: "om",
      url: "",
      layout: 'FullScreen',
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      // restrictedTo: [ omId + '#admin' ],
      type: "view",
      layout: 'Grid',
      name: "settings",
      url: "settings",
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      // restrictedTo: [ omId + '#admin' ],
      type: "block",
      blockType: "content",
      name: "SpaceCreator",
      view: [ "om", "settings" ]
    })
  }
})
