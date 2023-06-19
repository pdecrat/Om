import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter} from 'react-router-dom';
import { onPageLoad } from 'meteor/server-render';
import { Helmet } from 'react-helmet';
import { createMemoryHistory } from 'history';
import { ServerStyleSheets } from '@material-ui/core/styles';

import App from '/imports/ui/App';

onPageLoad((sink) => {
  const history = createMemoryHistory({
    initialEntries: [sink.request.url],
  })
  const Prerender = props => (
    <StaticRouter context={history}>
      <App />
    </StaticRouter>
  );

  const stop = history.listen((match, type) => {
    if (type === 'REPLACE') {
      sink.setStatusCode('302');
      sink.redirect(match.pathname);
    }
  })

  const sheet = new ServerStyleSheets();
  sink.renderIntoElementById('react-root', renderToString(sheet.collect(<Prerender location={sink.request.url} />)));
  sink.appendToHead(sheet.toString());

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
  stop();
});
