import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import ContextTracker from '/imports/ui/ContextTracker';

export const UserContext = React.createContext({});

const Provider = () => {
  const isUserRegistered = useTracker(() => !!Meteor.userId())

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
