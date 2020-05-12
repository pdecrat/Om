import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles';

import { Context } from '/imports/ui/providers/ContextProvider';

const StyleProvider = ({ children }) => {
  const { context } = useContext(Context);
  const muiTheme = React.useMemo(() => {
      return createMuiTheme(context.theme)
    },
    [context.theme],
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <StylesProvider disableGeneration={Meteor.isServer}>
        <ThemeProvider theme={muiTheme}>
          {children}
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default StyleProvider;
