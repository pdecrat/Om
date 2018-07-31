import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import UserDataStore from './UserDataStore';
import ContentDataStore from './ContentDataStore';
import mainReducer from './redux/main-reducer';
import Modal from '/imports/ui/Modal/Modal';
import NotFound from '/imports/ui/NotFound';
import '/imports/ui/_lib/global-style';


const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(mainReducer), // new root reducer with router state
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      // ... other middlewares ...
    ),
  ),
)
const App = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <UserDataStore />
        <Switch>
          <Route path="/s/:spaceName" component={ContentDataStore} />
          <Route exact path="/" render={() =>
            <Redirect to="/s/om"/>
          }/>
          <Route component={NotFound} />
        </Switch>

        <Modal />
      </div>
    </ConnectedRouter>
  </Provider>

export default App
