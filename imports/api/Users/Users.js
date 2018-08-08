import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Actions from '/imports/api/Actions';
const Users = Meteor.users;

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    return {
      ...user,
      name: user.username || '??',
      spaces: options.spaces || [],
      type: 'user'
    }
  })

  Meteor.publish('current-user-data', function() {
    const userId = this.userId;
    const user = Meteor.users.findOne(userId, {
      fields: {
        spaces: 1
      }
    });

    if (userId) {
      return [
        Meteor.users.find(userId),
        Actions.getType('space').find({
          name: { $in: user.spaces }
        })
      ];
    } else {
      this.ready();
    }
  });
}

export default Users;
