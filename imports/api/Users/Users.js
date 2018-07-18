import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Collections, Collection } from '/imports/api/Collections';

const Users = Meteor.users;

if (Meteor.isServer) {
  Accounts.onCreateUser((options, { username, ...user }) => {
    new Collection(user._id);
    return {
      ...user,
      name: username,
      spaces: options.spaces
    }
  })
}

Collections['users'] = Users;
export default Users;
