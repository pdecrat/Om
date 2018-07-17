import { Meteor } from 'meteor/meteor';

import { Collection } from '/imports/api/Collections';

const Spaces = new Collection('spaces');

export default Spaces;

Meteor.methods({
  'spaces.get'(name) {
    return Spaces.findOne({name});
  },
  'space.create'(name) {
    return Spaces.insert({name});
  }
});
