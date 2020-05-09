import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

if (Meteor.isServer) {
  import Passwordless from '../Passwordless';
}
import Actions from '/imports/core/Actions';

Actions.registerEffect('register', {
  fn({ data }) {
    if (Meteor.isServer) {
      Passwordless.sendLoginEmail(data.email.toLowerCase(), data.url);
    }
  },
  dataSchema: new SimpleSchema({
    email: {
      type: String
    },
    url: {
      type: String
    }
  })
})
