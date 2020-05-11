import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import ContextTracker from '/imports/ui/ContextTracker';

export const UserContext = React.createContext({});

const Provider = () => {
  const isUserRegistered = useTracker(() => !!Meteor.userId())
  const isLoggingIn = useTracker(() => Meteor.loggingIn());
  const history = useHistory();
  const query = qs.parse(history.location.search) || {};

  const isReady = useTracker(() => {
    if (isUserRegistered) {
      const handle = Meteor.subscribe('user-data')
      return handle.ready();
    } else return false;
  }, [isUserRegistered]);

  const user = useTracker(() => {
    if (isReady) return Meteor.user();
    return null;
  }, [isReady])

  if (!!query.token && !isLoggingIn && !user) {
    Accounts.callLoginMethod({
      methodArguments: [{
        'passwordless': {
          token: query.token
        }
      }],
      userCallback: function(err, res) {
        if (err) console.log(err);
        const { token, ...rest } = query;
        history.push(`${history.location.pathname}?${qs.stringify({ ...rest })}`)
      }
    });
  }

  return (
    <UserContext.Provider value={{ user }}>
      {isReady || !isUserRegistered ?
        <ContextTracker />
        : null
      }
    </UserContext.Provider>
  )
}

export default Provider;
