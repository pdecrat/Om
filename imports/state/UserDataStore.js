import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { setUser } from '/imports/state/redux/user';
import { callSetSpaces } from '/imports/state/redux/spaces';
import Navigation from '/imports/ui/Navigation/Navigation';

const UserDataStore = withTracker(props => {
  const userId = Meteor.userId();

  if (userId) {
    Meteor.subscribe('current-user-data', () => {
      Meteor.users.find(userId).observeChanges({
        added(_id, fields) {
          props.dispatchSetUser({ _id, ...fields });
          props.dispatchSetSpaces(fields.spaces);
        },
        removed(_id) {
          props.dispatchSetUser({});
          props.dispatchSetSpaces([]);
        },
        changed(_id, { spaces }) {
          if (spaces) {
            props.dispatchSetSpaces(spaces);
          }
        }
      });

    });
  }

  return props;
})(Navigation);

const mapDispatchToProps = dispatch => ({
  dispatchSetUser: user => dispatch(setUser(user)),
  dispatchSetSpaces: spaces => dispatch(callSetSpaces(spaces)),
});

export default connect(null, mapDispatchToProps)(UserDataStore);
