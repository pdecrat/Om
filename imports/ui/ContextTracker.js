import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { replace } from 'connected-react-router';
import { matchPath } from 'react-router';
import qs from 'query-string';

import Data from '/imports/api/Data';
import Spaces from '/imports/api/Spaces/Spaces';
import { setContext } from '/imports/ui/_state/context';
import Interface from '/imports/ui/Interface';

const ContextTracker = withTracker(props => {
  const {
    path,
    search,
    dispatchPush,
    dispatchSetSpace,
    match,
  } = props;
  const reference = decodeURIComponent(match.params.reference);
  const type = match.params.type === 's' ? 'space' : 'user';
  const sub = Meteor.subscribe('context-data', reference);
  const query = { reference }
  if (Meteor.isServer) query.root = type;
  const doc = Data.findOne(query);

  if (!doc && (Meteor.isServer || sub.ready())) {
    dispatchPush('/not-found');
  } else if (Meteor.isServer || sub.ready()) {
    dispatchSetSpace(doc, qs.parse(search), match);
  }

  return {
    ...props,
    query,
  };

})(Interface);

const mapStateToProps = state => ({
  search: state.router.location.search,
  path: state.router.location.pathname,
});
const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, query, match) => dispatch(setContext(space, query, match)),
  dispatchPush: url => dispatch(replace(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContextTracker);
