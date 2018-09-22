import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

if (Meteor.isServer) {
  import Passwordless from '../passwordless';
}
import Actions from '/imports/api/Actions';

const login = ({ data }) => {
  if (Meteor.isServer) {
    Passwordless.sendLoginEmail(data.email);
  }
}
login.dataSchema = new SimpleSchema({
  email: {
    type: String
  },
})
Actions.registerEffect('login', login)
