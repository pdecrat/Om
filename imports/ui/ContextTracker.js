import React from 'react';

import { withRouter} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { matchPath } from 'react-router';
import qs from 'query-string';

import Data from '/imports/api/Data';
import Spaces from '/imports/api/Spaces/Spaces';
import Interface from '/imports/ui/Interface';

export const Context = React.createContext('context')

const Tracker = withTracker(props => {
  const {
    path,
    search,
    history,
    match,
  } = props;
  const reference = decodeURIComponent(match.params.reference);
  const type = match.params.type === 's' ? 'space' : 'user';
  const sub = Meteor.subscribe('context-data', reference);
  const query = { reference }
  if (Meteor.isServer) query.root = type;
  const context = Data.findOne(query);

  if (!context && (Meteor.isServer || sub.ready())) {
    history.push('/not-found');
  } else if (Meteor.isServer || sub.ready()) {
    return {
      ...props,
      context,
      query,
    };
  }

});

const Provider = ({ context, query }) =>
  <Context.Provider value={{ context, query }}>
    <Interface />
  </Context.Provider>

export const ContextTracker = withRouter(Tracker(Provider));
