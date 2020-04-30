import React from 'react';
import { useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import Data from '/imports/core/Data';
import Interface from '/imports/ui/Interface';

export const Context = React.createContext({})

const Provider = ({ context, query, isReady = false }) => {
  function call({ name, target, data }, callback) {
    if (!target) {
      target = {
        _id: context._id,
        root: context.root,
      };
    }
    const options = {
      returnStubValue: true,
      throwStubxceptions: true
    };
    Meteor.apply('do', [{ name, target, data }], options, callback);
  }
  // console.log("handle ready in ContextProvider ?")
  // console.log(isReady)
  return (
    <Context.Provider value={{ context, query, isReady, call }}>
      <Interface />
    </Context.Provider>
  )
}

export const ContextTracker = withTracker(props => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const reference = decodeURIComponent(match.params.reference);
  const type = match.params.type === 's' ? 'space' : 'user';
  const handle = Meteor.subscribe('context-data', reference);
  const mongoQuery = { reference }
  if (Meteor.isServer) mongoQuery.root = type;
  const context = Data.findOne(mongoQuery);

  if (Meteor.isClient) {
    Data.find({ $or: [ { type: 'block' }, { type: 'action' } ] }).observe({
      added: ({type, name}) => {
        console.log(`${type} added: ${name}`);
      }
    })
  }

  if (!context && (Meteor.isServer || handle.ready())) {
    console.log("redirect from context")
    history.push('/not-found');
  }

  // console.log("handle ready in ContextTracker ?")
  // console.log(handle.ready())
  const query = qs.parse(location.search);
  return {
    context,
    query,
    isReady: handle.ready()
  };
})(Provider);
