import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { push } from 'connected-react-router';

import Spaces from '/imports/api/Spaces/Spaces';
import Content from '/imports/api/Content/Content';
import * as Space from '/imports/state/redux/space';
import Grid from '/imports/ui/Grid';

const SpaceDataStore = withTracker(props => {
  const name = decodeURIComponent(props.match.params.spaceName);
  const hash = props.location.hash.slice(1) || name;
  const subscription = Meteor.subscribe('current-space-data', name);

  const space = Spaces.findOne({ name });
  if (subscription.ready() && !space) {
    props.dispatchPush('/not-found')
    return props;
  } else {
    const blocks = space && Content.find({
      parentId: space._id,
      type: 'block',
      isActive: true,
    }).fetch();

    console.log(blocks)
    return {
      ...props,
      space,
      blocks,
      isLoading: !subscription.ready()
    }
  }

})(Grid);

const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, hash) => dispatch(Space.setSpace(space, hash)),
  dispatchSetBlocks: blocks => dispatch(Space.setBlocks(blocks)),
  dispatchPush: url => dispatch(push(url)),
});

export default connect(null, mapDispatchToProps)(SpaceDataStore);
