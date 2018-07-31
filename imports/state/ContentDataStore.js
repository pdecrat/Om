import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Spaces from '/imports/api/Spaces/Spaces';
import { setSpace } from '/imports/state/redux/space';
import Grid from '/imports/ui/Grid';

const notFound = {
  _id: '1234',
  name: "???",
  blocks: [
    'NotFound'
  ]
}

const SpaceDataStore = withTracker(props => {
  const name = props.match.params.spaceName;

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
      props.dispatchSetSpace(space)
    } else {
      props.dispatchSetSpace(notFound)
    }

  })

  return props;
})(Grid);

const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: space => dispatch(setSpace(space))
});

export default connect(null, mapDispatchToProps)(SpaceDataStore);
