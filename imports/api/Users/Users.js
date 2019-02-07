import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Spaces from '/imports/api/Spaces/Spaces';
import { Collections } from '/imports/api/Collections';

import '/imports/api/Users/effects/index';

const Users = Meteor.users;
Collections.register("user", Users);

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    const returnedUser = {
      ...user,
      root: 'user',
      name: user.username || '??',
      spaces: options.spaces || [],
    };

    Collections.add(user._id);
    Collections.get(user._id).insert({
      ...returnedUser,
      isActive: true,
      isPublic: true,
      type: 'header',
      root: user._id,
    });
    return returnedUser
  })

  Meteor.publish('user-data', function() {
    const userId = this.userId;

    if (userId) {
      const userCursor = Meteor.users.find(userId, {
        fields: {
          spaces: 1
        }
      });
      const user = userCursor.fetch()[0];
      const contentCursor = Collections.get(user._id).find();
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
