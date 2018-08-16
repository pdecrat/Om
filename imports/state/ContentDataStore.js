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

  Meteor.subscribe('current-space-data', name, () => {
    const cursor = Spaces.find({ name });
    if (cursor.count() === 0) {
      props.dispatchPush('/not-found')
    } else {
      cursor.observeChanges({
        added(_id, fields) {
          props.dispatchSetSpace({
            _id,
            ...fields
          }, hash);
        },
        changed(_id, { blocks }) {
          if (blocks) {
            props.dispatchSetBlocks(blocks);
          }
        }
      })
    }
  })

  return props;
})(Grid);

const mapDispatchToProps = dispatch => ({
  dispatchSetSpace: (space, hash, contentHandle) => dispatch(Space.setSpace(space, hash, contentHandle)),
  dispatchSetBlocks: blocks => dispatch(Space.setBlocks(blocks)),
  dispatchPush: url => dispatch(push(url)),
});

export default connect(null, mapDispatchToProps)(SpaceDataStore);
