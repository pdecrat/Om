import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { Collections } from '/imports/api/Collections';
import Users from '/imports/api/Users/Users';
import { callAddCollection, callRemoveCollection } from '/imports/state/redux/collections';
import { callSetSpace, unsetSpace } from '/imports/state/redux/space';
import { setUser, unsetUser } from '/imports/state/redux/user';
import Interface from '/imports/ui/Interface';

const DataStore = withTracker(props => {
  const user = Meteor.user();

  if (user) {
    Meteor.subscribe('datastore', () => {
      Collections.find({}).observeChanges({
        added(id, fields) {
          // console.log(fields);
          props.dispatchAddCollection(fields.name);
        },
        removed(id) {
          props.dispatchRemoveCollection(id);
          // console.log('collection removed: ' + id)
        }
      });
      Collections['spaces'].find().observeChanges({
        added(id, fields) {
          // console.log(fields);
          props.dispatchAddCollection(id);
          props.dispatchSetSpace(fields.name);
        },
        removed(id) {
          props.dispatchUnsetSpace();
          props.dispatchRemoveCollection(id);
          // console.log('space removed: ' + id)
        }
      })
      Collections['users'].find({ _id: user._id }).observeChanges({
        added(id, fields) {
          props.dispatchAddCollection(id);
          props.dispatchSetUser(fields);
        },
        removed(id) {
          props.dispatchUnsetUser();
          props.dispatchRemoveCollection(id);
        }
      })
    });
  }

  return props;
})(Interface);

const mapDispatchToProps = dispatch => ({
  dispatchAddCollection: collection => dispatch(callAddCollection(collection)),
  dispatchRemoveCollection: collection => dispatch(callRemoveCollection(collection)),
  dispatchSetSpace: space => dispatch(callSetSpace(space)),
  dispatchUnsetSpace: () => dispatch(unsetSpace()),
  dispatchSetUser: user => dispatch(setUser(user)),
  dispatchUnsetUser: () => dispatch(unsetUser()),
});

export default connect(null, mapDispatchToProps)(DataStore);
