import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { logInUser, logOutUser } from '/imports/state/redux/user';
import { callSetShortcuts } from '/imports/state/redux/user';
import Navigation from '/imports/ui/Navigation/Navigation';

const UserDataStore = withTracker(props => {
  const userId = Meteor.userId();

  if (userId) {
    Meteor.subscribe('current-user-data', () => {
      Meteor.users.find(userId).observeChanges({
        added(_id, fields) {
          props.dispatchLogIn({ _id, ...fields });
          props.dispatchSetShortcuts(fields.spaces);
        },
        removed(_id) {
          props.dispatchLogOut();
          props.dispatchSetShortcuts([]);
        },
        changed(_id, { spaces }) {
          if (spaces) {
            props.dispatchSetShortcuts(spaces);
          }
        }
      });

    });
  }

  return props;
})(Navigation);

const mapDispatchToProps = dispatch => ({
  dispatchLogIn: user => dispatch(logInUser(user)),
  dispatchLogOut: () => dispatch(logOutUser()),
  dispatchSetShortcuts: shortcuts => dispatch(callSetShortcuts(shortcuts)),
});

export default connect(null, mapDispatchToProps)(UserDataStore);
