import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { replace } from 'connected-react-router';
import qs from 'query-string';

import { setUser, logOutUser, setAsLoggingIn } from '/imports/ui/_state/user';
import { ContextTracker } from '/imports/ui/ContextTracker';

const UserDataStore = withTracker(props => {
  if (Meteor.isServer) return props;

  const query = qs.parse(props.search) || {};
  const user = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  const handle = Meteor.subscribe('user-data');

  if (!!query.token && !loggingIn) {
    Accounts.callLoginMethod({
      methodArguments: [{
        'passwordless': {
          token: query.token
        }
      }],
      userCallback: function(err, res) {
        if (err) console.log(err);
        props.dispatchPush(props.path);
      }
    });

  }
  if (!loggingIn && user && handle.ready()) {
    props.dispatchSetUser(user);
  } else if (loggingIn) {
    props.dispatchSetAsLoggingIn();
  } else {
    props.dispatchLogOut();
  }

  return props;
})(ContextTracker);

const mapStateToProps = state => ({
  search: state.router.location.search,
  path: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetUser: user => dispatch(setUser(user)),
  dispatchLogOut: () => dispatch(logOutUser()),
  dispatchSetAsLoggingIn: () => dispatch(setAsLoggingIn()),
  dispatchPush: url => dispatch(replace(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataStore);
