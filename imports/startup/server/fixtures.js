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
        ...membership,
      })
    }
    const { _id: homepageId } = Data.findOne({
      root: omId,
      type: "view",
      name: "om",
      isMainView: true,
    })
    const viewManagerId = Data.insert({
      root: omId,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "view",
      name: "view-manager",
    })
    Data.insert({
      root: omId,
      type: "block",
      text: "Vous pouvez dès maintenant y créer vos propres espaces virtuels, et bientôt profiter pleinement de nombreuses fonctionnalités faites avec soin pour vous faciliter la vie.",
      blockType: "content",
      name: 'Paragraph',
      viewOrder: 4,
      viewId: homepageId
    })
    Data.insert({
      root: omId,
      type: "block",
      blockType: "content",
      name: 'Image',
      viewOrder: 5,
      viewId: homepageId
    })
    Data.insert({
      root: omId,
      isPublic: false,
      restrictedTo: ["admin"],
      type: "block",
      blockType: "content",
      name: 'ViewsManager',
      viewOrder: 1,
      viewId: viewManagerId
    })
  }
})
