import React from 'react';
import { useHistory } from 'react-router-dom';

import Data from '/imports/core/Data';
import Interface from '/imports/ui/Interface';
import useSpace from '/imports/ui/hooks/useSpace';
import useCall from '/imports/ui/hooks/useCall';

export const Context = React.createContext({})

const Provider = () => {
  const history = useHistory();
  const { context, isReady } = useSpace();

  if (!context && (Meteor.isServer || isReady)) {
    history.replace('/not-found');
    return null;
  }
  return (
    <Context.Provider value={{ context, isReady }}>
      {isReady ?
        <Interface context={context} />
        : null
      }
    </Context.Provider>
  )
}

export default Provider;
