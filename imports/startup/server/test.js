import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.users.remove({});
});
