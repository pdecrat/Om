import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { push } from 'connected-react-router';
import { matchPath } from 'react-router';

import Spaces from '/imports/api/Spaces/Spaces';
import { setSpace } from '/imports/ui/_state/space';
import Breadcrumbs from '/imports/ui/Breadcrumbs';

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

const ContentDataStore = withTracker(props => {
  const {
    path,
    hash,
    dispatchPush,
    dispatchSetSpace,
  } = props;

  if (path === '/') {
    dispatchPush('/s/om');
    return props;
  }

  const spaceMatch = matchPath(path, spacePath);
  if (spaceMatch) {
    const reference = decodeURIComponent(spaceMatch.params.spaceName);
    Meteor.subscribe('current-space-data', reference, () => {
      const cursor = Spaces.find({ reference });

      if (cursor.count() === 0) {
        dispatchPush('/not-found');
      } else {
        cursor.observe({
          added(doc) {
            dispatchSetSpace(doc, hash, spaceMatch);
          },
          changed(doc) {
            dispatchSetSpace(doc, hash, spaceMatch);
          }
        });
      }

    });

    return {
      ...props,
      match: spaceMatch,
      hash,
    };
  }

  const loginMatch = matchPath(path, loginPath);
  if (loginMatch) {
    const credentials = loginMatch.params.credentials.split(':');

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
    return props;
  }

  dispatchPush('/not-found');


  return props;

})(Breadcrumbs);

const mapStateToProps = state => ({
  path: state.router.location.pathname,
  hash: state.router.location.hash,
});
const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, hash, match) => dispatch(setSpace(space, hash, match)),
  dispatchPush: url => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentDataStore);
