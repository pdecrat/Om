import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

if (Meteor.isServer) {
  import Passwordless from '../passwordless';
}
import Actions from '/imports/api/Actions';

const register = ({ data }) => {
  if (Meteor.isServer) {
    const user = Meteor.users.findOne({ email: data.email });

    if (!user)
      Passwordless.sendLoginEmail(data.email, data.url);
  }
}
register.dataSchema = new SimpleSchema({
  email: {
    type: String
  },
  url: {
    type: String
  }
})
Actions.registerEffect('register', register)
