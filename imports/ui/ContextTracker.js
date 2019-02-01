import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { replace } from 'connected-react-router';
import { matchPath } from 'react-router';
import qs from 'query-string';

import Data from '/imports/api/Data';
import Spaces from '/imports/api/Spaces/Spaces';
import { setContext } from '/imports/ui/_state/context';
import Menu from '/imports/ui/Menu/Menu';

const spacePath = {
  path: '/s/:spaceName',
  exact: true
}

const loginPath = {
  path: '/login/:credentials',
  exact: true
}

const notFoundPath = {
  path: '/not-found',
  exact: true
}

const ContextTracker = withTracker(props => {
  const {
    path,
    hash,
    search,
    dispatchPush,
    dispatchSetSpace,
  } = props;
  const queryParams = qs.parse(search) || "";

  if (path === '/') {
    dispatchPush('/s/om');
    return props;
  }

  const spaceMatch = matchPath(path, spacePath);
  if (spaceMatch) {
    const reference = decodeURIComponent(spaceMatch.params.spaceName);

    if (Meteor.isServer) {
      const doc = Spaces.findOne({ reference });
      if (!doc) {
        dispatchPush('/not-found');
      } else {
        dispatchSetSpace(doc, queryParams, spaceMatch);
      }
    }
    Data.subscribe('target-data', reference, () => {
      const cursor = Data.find({ reference });

      if (cursor.count() === 0) {
        dispatchPush('/not-found');
      } else {
        cursor.observe({
          added(doc) {
            dispatchSetSpace(doc, queryParams, spaceMatch);
          },
          changed(doc) {
            dispatchSetSpace(doc, queryParams, spaceMatch);
          }
        });
      }
    });

    return {
      ...props,
      match: spaceMatch,
      queryParams,
    };
  }

  const loginMatch = matchPath(path, loginPath);
  if (loginMatch) {
    if (Meteor.isServer) return props;
    const credentials = loginMatch.params.credentials.split(':');
    console.log('hey')
    Accounts.callLoginMethod({
      methodArguments: [{
        'passwordless': {
          encodedEmail: credentials[0],
          token: credentials[1]
        }
      }],
      userCallback: function(err, res) {
        if (err) console.log(err);
        else {
          dispatchPush('/s/om');
        };
      }
    });

    return props;
  }

  const notFoundMatch = matchPath(path, notFoundPath);
  if (notFoundMatch) {
    dispatchSetSpace({}, '', {});
    return props;
  }

  dispatchPush('/not-found');


  return props;

})(Menu);

const mapStateToProps = state => ({
  search: state.router.location.search,
  path: state.router.location.pathname,
  hash: state.router.location.hash,
});
const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, hash, match) => dispatch(setContext(space, hash, match)),
  dispatchPush: url => dispatch(replace(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContextTracker);
