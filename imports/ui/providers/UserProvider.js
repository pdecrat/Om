import React from 'react';

import ContextTracker from '/imports/ui/providers/ContextProvider';
import useQuery from '/imports/ui/hooks/useQuery';
import useUser from '/imports/ui/hooks/useUser';

export const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const query = useQuery();
  const { isReady, user, register } = useUser();

  if (!!query.token && isReady && !user) {
    register(query)
  }

  return (
    <UserContext.Provider value={{ user }}>
      {isReady ?
        children
        : null
      }
    </UserContext.Provider>
  )
}

export default UserProvider;
