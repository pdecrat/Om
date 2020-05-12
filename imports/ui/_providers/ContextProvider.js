import React from 'react';
import { useHistory } from 'react-router-dom';

import Interface from '/imports/ui/Interface';
import useSpace from '/imports/ui/_hooks/useSpace';
import useCall from '/imports/ui/_hooks/useCall';

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
