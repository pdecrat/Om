import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

import UserProvider from '/imports/ui/_providers/UserProvider';
import ContextProvider from '/imports/ui/_providers/ContextProvider';
import StyleProvider from '/imports/ui/_providers/StyleProvider';
import ViewProvider from '/imports/ui/_providers/ViewProvider';
import UIProvider from '/imports/ui/_providers/UIProvider';
import View from '/imports/ui/View';
import NotFound from '/imports/ui/NotFound';

const Providers = () =>
  <UserProvider>
    <ContextProvider>
      <ViewProvider>
        <StyleProvider>
          <UIProvider>
            <View />
          </UIProvider>
        </StyleProvider>
      </ViewProvider>
    </ContextProvider>
  </UserProvider>

const App = () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    history.push('/s/om')
    return null;
  }

  return (
    <Switch>
      <Route path='/:type([s, u])/:reference' component={Providers} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
