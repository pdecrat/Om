import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Content from '/imports/ui/Content';
import Menu from '/imports/ui/Menu/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

const Interface = ({ context }) => {
  const theme = React.useMemo(() => {
      return context ?
        createMuiTheme(context.theme)
        : createMuiTheme();
    },
    [context],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <Content />
    </ThemeProvider>
  );
}

export default Interface;
