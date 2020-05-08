import React from 'react';
import { useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import qs from 'query-string';

import Data from '/imports/core/Data';
import Interface from '/imports/ui/Interface';

export const Context = React.createContext({})

const Provider = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const reference = decodeURIComponent(match.params.reference);
  const type = match.params.type === 's' ? 'space' : 'user';
  const query = location.search ? qs.parse(location.search) : {};

  const isReady = useTracker(() => {
    const handle = Meteor.subscribe('context-data', reference);

    return handle.ready();
  }, [reference]);

  const context = useTracker(() => {
    if (isReady) {
      const mongoQuery = Meteor.isServer ?
        { reference, root: type }
        : { reference }
      const context = Data.findOne(mongoQuery);
      return context;
    }

    return {};
  }, [isReady]);

  if (!context && (Meteor.isServer || isReady)) {
    history.push('/not-found');
    return null;
  }

  const call = ({ name, target, data }, callback) => {
    if (!target) {
      target = {
        _id: context._id,
        root: context.root,
      };
    } else {
      target = {
        _id: target._id,
        root: target.root,
      };
    }
    const options = {
      returnStubValue: true,
      throwStubxceptions: true
    };
    Meteor.apply('do', [{ name, target, data }], options, callback);
  };

  return (
    <Context.Provider value={{ context, query, isReady, call }}>
      {isReady && context ?
        <Interface context={context} />
        : null
      }
    </Context.Provider>
  )
}

export default Provider;
