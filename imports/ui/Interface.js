import React from 'react';

import Content from '/imports/ui/Content';
import Menu from '/imports/ui/Menu/Menu';
import UserProvider from '/imports/ui/providers/UserProvider';
import ContextProvider from '/imports/ui/providers/ContextProvider';
import StyleProvider from '/imports/ui/providers/StyleProvider';
import useUI from '/imports/ui/hooks/useUI';

export const InterfaceContext = React.createContext({})

const Interface = () => {
  const uiStatus = useUI();

  return (
    <UserProvider>
      <ContextProvider>
        <StyleProvider>
          <InterfaceContext.Provider value={uiStatus}>
            <React.Fragment>
              <Menu />
              <Content />
            </React.Fragment>
          </InterfaceContext.Provider>
        </StyleProvider>
      </ContextProvider>
    </UserProvider>
  );
}

export default Interface;
