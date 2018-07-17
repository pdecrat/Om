import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { Collections } from '/imports/api/Collections';
import { callAddCollection } from '/imports/state/redux/collections';
import { callAddSpace } from '/imports/state/redux/spaces';
import { callSetSpace } from '/imports/state/redux/space';
import Interface from '/imports/ui/Interface';

const DataStore = withTracker(props => {
  const handle = Meteor.subscribe('datastore', () => {
    Collections.find({}).observeChanges({
      added(id, fields) {
        props.dispatchAddCollection(fields);
      },
      removed(id) {
        console.log('collection removed: ' + id)
      }
    });
    Collections['spaces'].find().observeChanges({
      added(id, fields) {
        props.dispatchAddSpace(fields);
        props.dispatchSetSpace(fields.name);
      },
      removed(id) {
        console.log('space removed: ' + id)
      }
    })
  });

  return props;
})(Interface);

const mapDispatchToProps = dispatch => ({
  dispatchAddCollection: collection => dispatch(callAddCollection(collection)),
  dispatchAddSpace: space => dispatch(callAddSpace(space)),
  dispatchSetSpace: space => dispatch(callSetSpace(space)),
});

export default connect(null, mapDispatchToProps)(DataStore);
