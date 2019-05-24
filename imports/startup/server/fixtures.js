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
    // Collections.get(omId).insert({
    //   root: omId,
    //   isActive: true,
    //   isPublic: true,
    //   type: "action",
    //   name: "register user",
    //   effects: {
    //     register: true
    //   }
    // })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      type: "action",
      restrictedTo: [ omId + '#admin' ],
      name: "createSpace",
      effects: {
        createSpace: true
      }
    })
    // Collections.get(omId).insert({
    //   root: omId,
    //   isActive: true,
    //   isPublic: true,
    //   type: "block",
    //   blockType: "user-icon",
    //   name: "User",
    // })
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
      layout: 'Feed',
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ omId + '#admin' ],
      type: "view",
      layout: 'Grid',
      name: "settings",
      url: "settings",
    })
    Collections.get(omId).insert({
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
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: true,
      type: "block",
      blockType: "content",
      name: "Paragraph",
      width: 3,
      height: 8,
      view: ["om"]
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ omId + '#admin' ],
      type: "block",
      blockType: "content",
      name: "ModalTester",
      view: ["om"]
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ omId + '#admin' ],
      type: "block",
      blockType: "content",
      name: "MenuTester",
      view: ["om"]
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ omId + '#admin' ],
      type: "block",
      blockType: "content",
      name: "ActionDispatcher",
      width: 1,
      height: 2,
      view: [ "settings" ]
    })
    Collections.get(omId).insert({
      root: omId,
      isActive: true,
      isPublic: false,
      restrictedTo: [ omId + '#admin' ],
      type: "block",
      blockType: "content",
      name: "DataList",
      width: 3,
      height: 4,
      view: [ "settings" ]
    })
  }
})
