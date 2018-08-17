import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import App from '/imports/ui/UserDataStore';
import mainReducer from '/imports/ui/_state/main-reducer';

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(mainReducer), // new root reducer with router state
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      // ... other middlewares ...
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
