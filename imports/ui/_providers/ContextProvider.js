import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import useSpace from '/imports/ui/_hooks/useSpace';

export const Context = React.createContext({})

const ContextProvider = ({ children }) => {
  const history = useHistory();

  const { context, isReady } = useSpace();
  if (!context && (Meteor.isServer || isReady)) {
    history.replace('/not-found');
    return null;
  }
  return (
    <Context.Provider value={{ context, isReady }}>
      {isReady ?
        children
        : null
      }
    </Context.Provider>
  )
}

export default ContextProvider;
