import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Collections, Collection } from '/imports/api/Collections';

class SpaceCollection extends Collection {
  insert(space, callback) {
    space.reference = space.name.toLowerCase().split(' ').join('-');
    space._id = new Mongo.ObjectID()._str;
    space.root = "space";
    Collections.add(space._id);
    Collections.get(space._id).insert({
      ...space,
      isActive: true,
      isPublic: true,
      type: 'header',
      root: space._id,
    });

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
        const userKeys = this.userId && Collections.get(this.userId).find({
          type: 'membership',
          memberOf: space._id,
        }).map(doc => doc.key);
        query.$or = [
          { restrictedTo: { $in: userKeys } },
          { isPublic: true },
        ];
      }
      const contentCursor = Collections.get(space._id).find(query);
      Mongo.Collection._publishCursor(contentCursor, this, 'data');

      this.ready();
    }
  });
}
