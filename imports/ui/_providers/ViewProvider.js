import React, { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { Context } from '/imports/ui/_providers/ContextProvider';
import useQuery from '/imports/ui/_hooks/useQuery';

export const ViewContext = React.createContext({})

const ViewProvider = ({ children }) => {
  const { context, isReady } = useContext(Context);
  const query = useQuery();

  const view = useTracker(() => {
    if (!isReady) return null;
    let tempQuery = {
      root: context.root,
      type: 'view',
    }

    if (query.view) {
      tempQuery.name = query.view;
    } else {
      tempQuery.isMainView = true;
    }
    return Data.findOne(tempQuery);
  }, [context.root, isReady, query.view]);

  return (
    <ViewContext.Provider value={{ view }}>
      {view ? children : null}
    </ViewContext.Provider>
  )

}

export default ViewProvider;
