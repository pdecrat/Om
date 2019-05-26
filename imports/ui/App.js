import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import UserTracker from '/imports/ui/UserTracker';
import NotFound from '/imports/ui/NotFound';

const App = ({ dispatchPush, router }) =>
  <Switch router={router} >
    <Route exact path="/" render={props => { dispatchPush('/s/om'); return null; }} />
    <Route path='/:type([s, u])/:reference' component={UserTracker} />
    <Route component={NotFound} />
  </Switch>


const mapDispatchToProps = dispatch => ({
  dispatchPush: url => dispatch(replace(url)),
});

export default connect(null, mapDispatchToProps)(App);
