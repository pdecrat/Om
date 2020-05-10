import SimpleSchema from 'simpl-schema';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('editView', {
  fn({ data, target }) {

    if (data.name.length < 2) {
      throw new Meteor.Error(
        'effects:create-view:name-too-short',
        "The view's name must be at least 3 characters long."
      )
    }
    Data.update({ _id: target._id, root: target.root }, {
      ...target,
      ...data
    })
  },
  dataSchema: new SimpleSchema({
    name: {
      type: String
    },
  }),
  form({ name = '' }, onChange) {
    return (
      <TextField
        key="name"
        autoFocus
        margin="dense"
        label="Nom"
        type="text"
        fullWidth
        value={name}
        onChange={onChange('name')}
      />
    )
  }
})
