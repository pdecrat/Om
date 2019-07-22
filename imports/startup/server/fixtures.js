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
        color: {
          light: 'rgb(253, 254, 253)',
          dark: 'rgb(45, 46, 43)'
        },
        size: {
          nav: '50px',
        }
      }
    });
    const admin = Meteor.users.findOne({ email: "philippe.decrat@gmail.com" })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      type: "membership",
      memberOf: omId,
      roles: ["admin"],
    })
    Data.insert({
      root: admin._id,
      isActive: true,
      isPublic: false,
      type: "membership",
      memberOf: omId,
      roles: ["admin"],
    })
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
      isPublic: false,
      type: "action",
      restrictedTo: [ 'admin' ],
      name: "createSpace",
      effects: {
        createSpace: true
      }
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "user-icon",
      name: "User",
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "interface",
      name: "Default",
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "view",
      name: "om",
      url: "",
      layout: 'FullScreen',
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "view",
      layout: 'Grid',
      name: "settings",
      url: "settings",
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      text: "Bonjour, et bienvenue sur la plateforme Om. Vous pourrez bientôt y créer vos propres espaces numériques, et ainsi profiter pleinement de nombreuses fonctionnalités faites avec soin pour vous faciliter la vie.",
      blockType: "content",
      name: "Paragraph",
      width: 3,
      height: 8,
      view: ["om"]
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      type: "block",
      blockType: "content",
      restrictedTo: [ 'admin' ],
      name: "Paragraph",
      width: 3,
      height: 4,
      view: ["settings"]
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "block",
      blockType: "content",
      name: "ModuleList",
      view: ["settings"]
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "block",
      blockType: "content",
      name: "ModalTester",
      view: ["settings"]
    })
    Data.insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ 'admin' ],
      type: "block",
      blockType: "content",
      name: "MenuTester",
      view: ["settings"]
    })
  }
})
