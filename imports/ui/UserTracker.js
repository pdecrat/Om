import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import { ContextTracker } from '/imports/ui/ContextTracker';

export const UserContext = React.createContext({})

const UserDataStore = withTracker(props => {
  if (Meteor.isServer) return props;

  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search) || {};
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
        history.push(props.path);
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

export const UserTracker = UserDataStore(Provider);
