import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { setUser, logOutUser, setAsLoggingIn } from '/imports/ui/_state/user';
import App from '/imports/ui/App';

const UserDataStore = withTracker(props => {
  const user = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  const handle = Meteor.subscribe('current-user-data');

  if (!loggingIn && user) {
    if (handle.ready()) {
      props.dispatchSetUser(user);
    }
  } else if (loggingIn) {
    props.dispatchSetAsLoggingIn();
  } else {
    props.dispatchLogOut();
  }

  return props;
})(App);

const mapDispatchToProps = dispatch => ({
  dispatchSetUser: user => dispatch(setUser(user)),
  dispatchLogOut: () => dispatch(logOutUser()),
  dispatchSetAsLoggingIn: () => dispatch(setAsLoggingIn()),
});

export default connect(null, mapDispatchToProps)(UserDataStore);
