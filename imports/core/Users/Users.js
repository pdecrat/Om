import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Spaces from '/imports/core/Spaces/Spaces';
import { Collections } from '/imports/core/Collections';

import '/imports/core/Users/effects/index';

const Users = Meteor.users;
Collections.register("user", Users);

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {

    Collections.add(user._id);
    Collections.get(user._id).insert({
      isActive: true,
      isPublic: true,
      type: 'header',
      root: user._id,
      email: options.email,
    });
    return {
      ...user,
      email: options.email,
    }
  })

  Meteor.publish('user-data', function() {
    const userId = this.userId;

    if (userId) {
      const contentCursor = Collections.get(userId).find();
      Mongo.Collection._publishCursor(contentCursor, this, 'data');

      this.ready();
    } else {
      const omId = Spaces.findOne({ name: "om" })._id;
      const contentCursor = Collections.get(omId).find({
        isPublic: true,
        type: 'block',
        name: 'User',
      });
      Mongo.Collection._publishCursor(contentCursor, this, 'data');
      this.ready();
    }
  });
}

export default Users;
