import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

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

const Interface = ({ theme = defaultTheme }) =>
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Modal />
      <Menu />
      <Content />
    </React.Fragment>
  </ThemeProvider>

const mapStateToProps = state => ({
  theme: state.context.doc.theme
});

export default connect(mapStateToProps, null)(Interface);
