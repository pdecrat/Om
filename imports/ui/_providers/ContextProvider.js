import React from 'react';
import { useHistory } from 'react-router-dom';

import Interface from '/imports/ui/Layout';
import useSpace from '/imports/ui/_hooks/useSpace';
import useView from '/imports/ui/_hooks/useView';

export const Context = React.createContext({})

const ContextProvider = ({ children }) => {
  const history = useHistory();

  const { context = {}, isReady = true } = useSpace();
  if (!context && (Meteor.isServer || isReady)) {
    history.replace('/not-found');
    return null;
  }

  const view = useView() || {};
  if (!view && (Meteor.isServer || isReady)) {
    history.replace('/not-found')
    return null;
  }

  return (
    <Context.Provider value={{ view, context, isReady }}>
      {isReady ?
        children
        : null
      }
    </Context.Provider>
  )
}

export default ContextProvider;
