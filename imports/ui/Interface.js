import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Content from '/imports/ui/Content';
import Menu from '/imports/ui/Menu/Menu';
import { Context } from '/imports/ui/ContextTracker'
import CssBaseline from '@material-ui/core/CssBaseline';

const Interface = () => {
  const { context } = useContext(Context);

  const theme = React.useMemo(() => {
      return context ?
        createMuiTheme(context.theme)
        : createMuiTheme();
    },
    [context],
  );

  return context ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <Content />
    </ThemeProvider>
  ) : null;
}

export default Interface;
