import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const Users = Meteor.users;

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    return {
      ...user,
      name: user.username,
      spaces: options.spaces
    }
  })

  Meteor.publish('current-user-data', function() {
    const userId = this.userId;

    if (userId) {
      return Meteor.users.find(userId);
    } else {
      this.ready();
    }
  });
}

export default Users;
