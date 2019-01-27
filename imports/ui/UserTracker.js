import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { setUser, logOutUser, setAsLoggingIn } from '/imports/ui/_state/user';
import Interface from '/imports/ui/Interface';

const UserDataStore = withTracker(props => {
  if (Meteor.isServer) return props;
  
  const user = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  const handle = Data.subscribe('user-data');

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
})(Interface);

const mapDispatchToProps = dispatch => ({
  dispatchSetUser: user => dispatch(setUser(user)),
  dispatchLogOut: () => dispatch(logOutUser()),
  dispatchSetAsLoggingIn: () => dispatch(setAsLoggingIn()),
});

export default connect(null, mapDispatchToProps)(UserDataStore);
