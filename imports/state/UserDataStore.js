import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { setUser } from '/imports/state/redux/user';
import Users from '/imports/api/Users/Users';
import Navigation from '/imports/ui/Navigation/Navigation';

const UserDataStore = withTracker(props => {
  const user = Meteor.user();

  if (user) {
    Meteor.subscribe('current-user-data', () => {
      Meteor.users.find(user._id).observeChanges({
        added(_id, fields) {
          props.dispatchSetUser({ _id, ...fields });
        },
        removed(_id) {
          props.dispatchSetUser({});
        }
      });
    });
  }

  return props;
})(Navigation);

const mapDispatchToProps = dispatch => ({
  dispatchSetUser: user => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(UserDataStore);
