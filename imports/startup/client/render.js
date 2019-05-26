import { Meteor } from 'meteor/meteor';
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { FastRender } from 'meteor/staringatlights:fast-render';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from '/imports/ui/App';
import mainReducer from '/imports/ui/_state/main-reducer';

const defaultState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(mainReducer),
  defaultState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);

FastRender.onPageLoad(() => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App router={history} />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('react-root'));
});
