import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from '/imports/ui/UserTracker';
import mainReducer from '/imports/ui/_state/main-reducer';

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(mainReducer),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
)

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('react-root'));
});
