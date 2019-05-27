import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withRouter} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import { ContextTracker } from '/imports/ui/ContextTracker';

export const UserContext = React.createContext({})

const UserDataStore = withTracker(props => {
  if (Meteor.isServer) return props;

  const query = qs.parse(props.search) || {};
  const user = Meteor.user();
  const isLoggingIn = Meteor.loggingIn();
  const handle = Meteor.subscribe('user-data');

  if (!!query.token && !isLoggingIn) {
    Accounts.callLoginMethod({
      methodArguments: [{
        'passwordless': {
          token: query.token
        }
      }],
      userCallback: function(err, res) {
        if (err) console.log(err);
        props.history.push(props.path);
      }
    });

  }
  return {
    user,
    isLoggingIn
  }
});

const Provider = ({ user, isLoggingIn }) =>
  <UserContext.Provider value={{ user, isLoggingIn }}>
    <ContextTracker />
  </UserContext.Provider>

export const UserTracker = withRouter(UserDataStore(Provider));
