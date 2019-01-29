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
import Interface from '/imports/ui/UserTracker';

onPageLoad((sink) => {
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

  const stop = history.listen((match, type) => {
    if (type === 'REPLACE') {
      sink.setStatusCode('302');
      sink.redirect(match.pathname);
    }
  })

  const sheet = new ServerStyleSheet();
  sink.renderIntoElementById('react-root', renderToString(sheet.collectStyles(<App location={sink.request.url} />)));
  sink.appendToHead(sheet.getStyleTags());

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
  const preloadedState = store.getState();
  stop();
  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);
});
