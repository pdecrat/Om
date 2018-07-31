import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Spaces from '/imports/api/Spaces/Spaces';
import { setSpace } from '/imports/state/redux/space';
import Grid from '/imports/ui/Grid';

const SpaceDataStore = withTracker(props => {
  const name = props.match.params.spaceName;

  Meteor.subscribe('current-space-data', name, () => {
    Spaces.find({ name }).observeChanges({
      added(_id, fields) {
        props.dispatchSetSpace({
          _id,
          ...fields
        });
      }
    })
  })

  return props;
})(Grid);

const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: space => dispatch(setSpace(space))
});

export default connect(null, mapDispatchToProps)(SpaceDataStore);
