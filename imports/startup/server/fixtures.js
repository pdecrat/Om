import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/core/Spaces/Spaces';
import { Collections } from '/imports/core/Collections';
import Data from '/imports/core/Data';

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

  Spaces.find().forEach(space => {
    db.dropCollection(space._id);
  });
  // Meteor.users.find().forEach(user => {
  // });
  // Meteor.users.remove({});
  Spaces.remove({})
  if (Spaces.find().count() === 0) {
    const omId = Spaces.insert({
      name: 'om',
      theme: {
        palette: {
          primary: {
            main: '#90a4ae',
          },
          secondary: {
            main: '#bbdefb',
          },
          contrastThreshold: 3,
          tonalOffset: 0.2,
        },
      }
    });
    const admin = Meteor.users.findOne({ email: "philippe.decrat@gmail.com" })
    if (admin) {
      db.dropCollection(admin._id);
      Collections.get(admin._id).insert({
        isActive: true,
        isPublic: true,
        type: 'header',
        root: admin._id,
        email: "philippe.decrat@gmail.com",
      });

      const membership = {
        type: "membership",
        memberOf: omId,
        roles: ["admin"],
      }
      Data.insert({
        root: omId,
        ...membership,
      })
      Data.insert({
        root: admin._id,
        type: "menuItem",
        label: "Settings",
        icon: "SettingsIcon",
        restrictedTo: "admin",
      })
      Data.insert({
        root: admin._id,
        type: "view",
        name: "Settings",
        restrictedTo: "admin",
        order: [],
      })
      Data.insert({
        root: admin._id,
        ...membership,
      })
    }
  }
})
