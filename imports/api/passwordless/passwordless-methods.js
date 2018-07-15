import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Passwordless from './passwordless';

Meteor.methods({
  'passwordless.sendLoginEmail'(email) {
    check(email, String);

    Passwordless.sendLoginEmail(email);
  }
});
