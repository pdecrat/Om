import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Collections, Collection } from '/imports/api/Collections';

class SpaceCollection extends Collection {
  insert(space, callback) {
    space.reference = space.name.toLowerCase().split(' ').join('-');
    space._id = new Mongo.ObjectID()._str;
    Collections.add(space.reference);

    return super.insert(space, callback);
  }
};

const Spaces = new SpaceCollection('spaces');

export default Spaces;

if (Meteor.isServer) {
  Meteor.publish('current-space-data', function(reference) {
    check(reference, String);
    const cursor = Spaces.find({ reference });

    if (cursor.count() === 0) {
      this.ready();
    } else {
      const space = cursor.fetch()[0];
      const contentCursor = Collections.get(space.reference).find();
      Mongo.Collection._publishCursor(contentCursor, this, 'content');

      return [
        cursor,
      ];
    }
  });
}
