import React from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

import ContextTracker from '/imports/ui/_providers/ContextProvider';
import useQuery from '/imports/ui/_hooks/useQuery';
import useUser from '/imports/ui/_hooks/useUser';

export const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const query = useQuery();
  const { isReady, user, register } = useUser();

  if (!!query.token && isReady && !user) {
    register(query)
  }

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <UserContext.Provider value={{ user, isUserSubReady: isReady }}>
        {isReady ?
          children
          : null
        }
      </UserContext.Provider>
    </DndProvider>
  )
}

export default UserProvider;
