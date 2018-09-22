import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Spaces from '/imports/api/Spaces/Spaces';
import { Collections } from '/imports/api/Collections';

import '/imports/api/Users/effects/index';

const Users = Meteor.users;

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    console.log(user);
    return {
      ...user,
      name: user.username || '??',
      spaces: options.spaces || [],
      type: 'user'
    }
  })

  Meteor.publish('current-user-data', function() {
    const userId = this.userId;

    if (userId) {
      const userCursor = Meteor.users.find(userId, {
        fields: {
          spaces: 1
        }
      });
      const user = userCursor.fetch()[0];
      return [
        userCursor,
        Spaces.find({
          name: { $in: user.spaces }
        })
      ];
    } else {
      return Spaces.find();
    }
  });
}

export default Users;
