import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Helmet } from 'react-helmet';
import { createMemoryHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { ServerStyleSheet } from 'styled-components'

import mainReducer from '/imports/ui/_state/main-reducer';
import Interface from '/imports/ui/Interface';

onPageLoad((sink) => {
  const context = {};

  // console.log(sink.request)
  const history = createMemoryHistory({
    initialEntries: [sink.request.url],
  })
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
  const App = props => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Interface />
      </ConnectedRouter>
    </Provider>
  );


  const sheet = new ServerStyleSheet();
  sink.renderIntoElementById('react-root', renderToString(sheet.collectStyles(<App location={sink.request.url} />)));
  sink.appendToHead(sheet.getStyleTags());

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());

  const preloadedState = store.getState();
  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);
});
