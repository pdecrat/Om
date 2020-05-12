import React from 'react';

import useUI from '/imports/ui/_hooks/useUI';

export const UIContext = React.createContext({})

const UIProvider = ({ children }) => {
  const uiStatus = useUI();

  return (
    <UIContext.Provider value={{ ...uiStatus }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider;
