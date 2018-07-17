import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import DataStore from './DataStore';
import mainReducer from './redux/main-reducer';

const store = createStore(mainReducer, {}, applyMiddleware(thunk));

const App = () =>
  <Provider store={store}>
    <DataStore />
  </Provider>

export default App
