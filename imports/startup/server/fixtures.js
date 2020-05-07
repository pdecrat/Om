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
        isActive: true,
        isPublic: false,
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
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "register user",
      effects: {
        register: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "createSpace",
      effects: {
        createSpace: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "editView",
      effects: {
        editView: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "createView",
      effects: {
        addView: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "removeView",
      effects: {
        removeView: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "addBlock",
      effects: {
        addBlock: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "removeBlock",
      effects: {
        removeBlock: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "action",
      name: "changeOrder",
      effects: {
        changeOrder: true
      }
    })
    const homepageId = Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "view",
      name: "home",
      layout: 'Feed',
      isMainView: true,
    })
    const viewManagerId = Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "view",
      layout: 'FullScreen',
      name: "view-manager",
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      text: "Bonjour, et bienvenue sur la plateforme Om. Vous pourrez bientôt y créer vos propres espaces numériques, et ainsi profiter pleinement de nombreuses fonctionnalités faites avec soin pour vous faciliter la vie.",
      blockType: "content",
      name: "Paragraph",
      viewOrder: 1,
      viewId: homepageId
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "content",
      name: "ViewsManager",
      viewOrder: 2,
      viewId: homepageId
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: ["admin"],
      type: "block",
      blockType: "content",
      name: "ViewsManager",
      viewOrder: 1,
      viewId: viewManagerId
    })
  }
})
