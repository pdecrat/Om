import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { onPageLoad } from 'meteor/server-render';
import { createBrowserHistory } from 'history';

import App from '/imports/ui/App';

onPageLoad(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('react-root'));
});
