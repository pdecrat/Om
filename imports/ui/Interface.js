import React from 'react';
import { ThemeProvider } from 'styled-components';

import Modal from '/imports/ui/Modal/Modal';
import Content from '/imports/ui/Content';
import Menu from '/imports/ui/Menu/Menu';

import '/imports/ui/_lib/global-style';

const defaultTheme = {
  color: {
    light: 'rgb(253, 254, 253)',
    dark: 'rgb(45, 46, 43)'
  }
}

const Interface = () =>
  <ThemeProvider theme={defaultTheme}>
    <React.Fragment>
      <Modal />
      <Menu />
      <Content />
    </React.Fragment>
  </ThemeProvider>

export default Interface
