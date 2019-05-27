import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { FastRender } from 'meteor/staringatlights:fast-render';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from '/imports/ui/App';

FastRender.onPageLoad(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('react-root'));
});
