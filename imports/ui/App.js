import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';

import './GlobalStyle';
import Login from './Login';
import Content from './Content/Content';
import Navigation from './Navigation/Navigation';


const App = () =>
  <Router>
    <div>
      <Navigation />
      <Content />
    </div>
  </Router>

export default App
