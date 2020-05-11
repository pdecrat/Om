import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

import UserTracker from '/imports/ui/UserTracker';
import NotFound from '/imports/ui/NotFound';

const App = () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    history.push('/s/om')
    return null;
  }

  return (
    <Switch>
      <Route path='/:type([s, u])/:reference' component={UserTracker} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
