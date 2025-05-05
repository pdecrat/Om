import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Collections } from '/imports/core/Collections';
import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data';

class SpaceCollection extends Mongo.Collection {
  insert(space, callback) {
    space = {
      ...space,
      reference: encodeURI(space.name),
      _id: new Mongo.ObjectID()._str,
      isActive: space.isActive ? space.isActive : true,
      isPublic: space.isPublic ? space.isPublic : true,
      root: "space",
      type: "space",
    }
    if (Meteor.isServer) {
      const root = space._id;
      const collection = Collections.add(root);
      collection.insert({
        ...space,
        type: 'header',
        root,
      });
      const mainViewId = Actions._effects.addView.fn({
        data: { name: space.name },
        target: { root, _id: root }
      })
      const target = Data.findOne({ root, _id: mainViewId });
      Actions.simulate({ target }, [
        {
          name: 'addBlock',
          data: { name: 'Paragraph' },
        },
        {
          name: 'addBlock',
          data: { name: 'TitleBlock' },
        },
        {
          name: 'addBlock',
          data: { name: 'Paragraph' },
        },
        {
          name: 'addBlock',
          data: { name: 'SpaceCreate' },
        },
        {
          name: 'addBlock',
          data: { name: 'Image' },
        },
        {
          name: 'addBlock',
          data: { name: 'Paragraph' },
        },
        {
          name: 'addBlock',
          data: { name: 'Image' },
        },
      ]);
      collection.insert({
        root: space._id,
        type: "action",
        name: "register user",
        effects: [
          { name: 'register' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "createSpace",
        effects: [
          { name: 'createSpace' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "editView",
        effects: [
          {
            name: 'editTextField',
            options: { fieldToChange: 'label' }
          }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "editImage",
        effects: [
          {
            name: 'editTextField',
            options: { fieldToChange: 'label' }
          },
          {
            name: 'editUrlField',
            options: { fieldToChange: 'imgUrl' }
          }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "editParagraph",
        effects: [
          {
            name: 'editTextField',
            options: { fieldToChange: 'text' }
          },
          {
            name: 'editTextField',
            options: { fieldToChange: 'label' }
          }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "editSpaceCreate",
        effects: [
          {
            name: 'editTextField',
            options: { fieldToChange: 'fieldText' }
          },
          {
            name: 'editTextField',
            options: { fieldToChange: 'buttonText' }
          },
          {
            name: 'editTextField',
            options: { fieldToChange: 'label' }
          }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "addView",
        effects: [
          { name: 'addView' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "removeView",
        effects: [
          { name: 'removeView' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "addBlock",
        effects: [
          { name: 'addBlock' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "removeBlock",
        effects: [
          { name: 'removeBlock' }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "applyThemeToSpace",
        effects: [
          { name: 'applyThemeToSpace' }
        ]
      });
      collection.insert({
        root: space._id,
        type: "action",
        name: "pushAtIndex",
        effects: [
          {
            name: 'pushAtIndex',
            options: { fieldName: 'order' }
          }
        ]
      })
      collection.insert({
        root: space._id,
        type: "action",
        name: "editTitleBlock",
        effects: [
          {
            name: 'editTitleBlock'
          }
        ]
      })
    }

    return super.insert(space, callback);
  }
};

const Spaces = new SpaceCollection('spaces');
Collections.register("space", Spaces);

export default Spaces;

if (Meteor.isServer) {
  Meteor.publish('context-data', function(reference) {
    check(reference, String);
    let cursor = Spaces.find({ reference });

    if (cursor.count() === 0) {
      cursor = Meteor.users.find({  _id: reference });
      if (cursor.count() === 0) {
        this.ready();
      }
    } else {
      const space = cursor.fetch()[0];
      let query = {
        isActive: true,
        type: { $in: [ 'header', "block", "view", "action" ] },
      };
      // if (!this.userId)
      //   query.isPublic = true;
      // else {
      //   const membership = this.userId && Collections.get(this.userId).findOne({
      //     type: 'membership',
      //     memberOf: space._id,
      //   });
      //
      //   query.$or = [
      //     { isPublic: true }
      //   ];
      //   if (membership) {
      //     query.$or.push(
      //       { restrictedTo: { $in: membership.roles } },
      //     )
      //   }
      // }
      const contentCursor = Collections.get(space._id).find(query);
      Mongo.Collection._publishCursor(contentCursor, this, 'data');

      this.ready();
    }
  });
}
