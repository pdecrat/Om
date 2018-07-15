import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Interface from '/imports/ui/Interface';

import mainReducer from './main-reducer';

const defaultState = {
  app: {
    modal: {
      open: false
    }
  }
}

const store = createStore(mainReducer, defaultState, applyMiddleware(thunk));

const App = () =>
  <Provider store={store}>
    <Interface />
  </Provider>

export default App
