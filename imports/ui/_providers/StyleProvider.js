import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles';

import { Context } from '/imports/ui/_providers/ContextProvider';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const StyleProvider = ({ children }) => {
  const { context: { theme: ctxTheme = {} } } = useContext(Context);
  const { view } = useContext(ViewContext);
  if (view && view.theme)
    ctxTheme = { ...ctxTheme, ...view.theme }
  const muiTheme = React.useMemo(() => {
      return createMuiTheme(ctxTheme)
    },
    [ctxTheme],
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </React.Fragment>
  )
}

export default StyleProvider;
