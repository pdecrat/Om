import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { push } from 'connected-react-router';

import Spaces from '/imports/api/Spaces/Spaces';
import { setSpace } from '/imports/state/redux/space';
import Grid from '/imports/ui/Grid';

const SpaceDataStore = withTracker(props => {
  const name = decodeURIComponent(props.match.params.spaceName);
  const hash = props.location.hash.slice(1) || name;

  Meteor.subscribe('current-space-data', name, () => {
    // Spaces.find({ name }).observeChanges({
    //   added(_id, fields) {
    //     props.dispatchSetSpace({
    //       _id,
    //       ...fields
    //     });
    //   }
    // })
    const space = Spaces.findOne({ name });

    if (!!space) {
      props.dispatchSetSpace(space, hash)
    } else {
      props.dispatchPush('/not-found')
    }
  })

  return props;
})(Grid);

const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, hash) => dispatch(setSpace(space, hash)),
  dispatchPush: url => dispatch(push(url)),
});

export default connect(null, mapDispatchToProps)(SpaceDataStore);
