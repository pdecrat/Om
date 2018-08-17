import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

import Actions from '/imports/api/Actions';

const Spaces = new Mongo.Collection('spaces');

export default Spaces;

if (Meteor.isServer) {
  Meteor.publish('current-space-data', function(name) {
    check(name, String);
    const cursor = Spaces.find({ name });

    if (cursor.count() === 0) {
      this.ready();
    } else {
      const parentId = cursor.fetch()[0]._id;

      return [
        cursor,
        Actions.find(),
        Actions.getType('blockTemplate').find(),
        Actions.getType('').find({ parentId })
      ];
    }
  });
}
