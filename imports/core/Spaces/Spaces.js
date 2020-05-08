import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Collections, Collection } from '/imports/core/Collections';

class SpaceCollection extends Collection {
  insert(space, callback) {
    space = {
      ...space,
      reference: space.name.toLowerCase().split(' ').join('-'),
      _id: new Mongo.ObjectID()._str,
      root: "space",
      type: "space",
      isActive: true,
      isPublic: true,
    }
    if (Meteor.isServer) {
      Collections.add(space._id);
      const collection = Collections.get(space._id);
      collection.insert({
        ...space,
        isActive: true,
        isPublic: true,
        type: 'header',
        root: space._id,
      });
      const mainViewId = collection.insert({
        isActive: true,
        isPublic: true,
        type: 'view',
        root: space._id,
        name: space.name,
        isMainView: true,
      });
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "block",
        text: "Bonjour, et bienvenue sur " + space.name,
        blockType: "content",
        name: "Paragraph",
        viewOrder: 1,
        viewId: mainViewId
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "block",
        blockType: "content",
        name: "SpaceCreate",
        viewOrder: 2,
        viewId: mainViewId
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "block",
        blockType: "content",
        name: "ViewsManager",
        viewOrder: 3,
        viewId: mainViewId
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "register user",
        effects: {
          register: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "createSpace",
        effects: {
          createSpace: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "editView",
        effects: {
          editView: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "createView",
        effects: {
          addView: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "removeView",
        effects: {
          removeView: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "addBlock",
        effects: {
          addBlock: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "removeBlock",
        effects: {
          removeBlock: true
        }
      })
      collection.insert({
        root: space._id,
        isActive: true,
        isPublic: true,
        type: "action",
        name: "changeOrder",
        effects: {
          changeOrder: true
        }
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
    const cursor = Spaces.find({ reference });

    if (cursor.count() === 0) {
      this.ready();
    } else {
      const space = cursor.fetch()[0];
      let query = {
        isActive: true,
        type: { $in: [ 'header', "block", "view", "action" ] },
      };
      if (!this.userId)
        query.isPublic = true;
      else {
        const membership = this.userId && Collections.get(this.userId).findOne({
          type: 'membership',
          memberOf: space._id,
        });

        query.$or = [
          { isPublic: true },
        ];
        if (membership) {
          query.$or.push(
            { restrictedTo: { $in: membership.roles } },
          )
        }
      }
      const contentCursor = Collections.get(space._id).find(query);
      Mongo.Collection._publishCursor(contentCursor, this, 'data');

      this.ready();
    }
  });
}
