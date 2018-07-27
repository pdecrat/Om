import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

const Spaces = new Mongo.Collection('spaces');

export default Spaces;

if (Meteor.isServer) {
  Meteor.publish('current-space-data', function(name) {
    check(name, String);

    return Spaces.find({ name });
  });
}

Meteor.methods({
  'spaces.create'(space) {
    const _id = Spaces.insert(space)
    Meteor.users.update(Meteor.userId(), {
      $addToSet: { spaces: space.name }
    });

    return {
      _id,
      ...space
    };
  }
})
