import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/state/App.js';

Meteor.startup(() => {
  render(
    <Router>
      <App />
    </Router>
    , document.getElementById('react-root'));
});
