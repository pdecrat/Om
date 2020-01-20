import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';
import Modal, { useModal } from '/imports/ui/Modal/Modal';
import Content from '/imports/ui/Content';
import Menu, { useMenu } from '/imports/ui/Menu/Menu';
import { Context } from '/imports/ui/ContextTracker'
import GlobalStyle from '/imports/ui/_lib/global-style';

const defaultTheme = {
  color: {
    light: 'rgb(253, 254, 253)',
    dark: 'rgb(45, 46, 43)'
  },
  size: {
    nav: '50px'
  }
}

export const InterfaceContext = React.createContext({});
const Interface = () => {
  const { context } = useContext(Context);
  const modal = useModal();
  const menu = useMenu();
  return context ?
    (
      <ThemeProvider theme={context.theme}>
        <InterfaceContext.Provider value={{
          ...modal,
          ...menu
        }}>
          <GlobalStyle />
          <Modal />
          <Menu />
          <Content />
        </InterfaceContext.Provider>
      </ThemeProvider>
    )
    : null;
}

export default Interface;
