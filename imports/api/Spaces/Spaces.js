import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

import Actions from '/imports/api/Actions';

const Spaces = new Mongo.Collection('spaces');

export default Spaces;

if (Meteor.isServer) {
  Meteor.publish('current-space-data', function(name) {
    check(name, String);

    return [
      Spaces.find({ name }),
      Actions.find(),
      Actions.getType('block').find(),
    ];
  });
}
