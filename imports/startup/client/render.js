import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { FastRender } from 'meteor/staringatlights:fast-render';
import { createBrowserHistory } from 'history';

import App from '/imports/ui/App';

FastRender.onPageLoad(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('react-root'));
});
