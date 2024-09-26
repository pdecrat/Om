import React from 'react';
import SimpleSchema from 'simpl-schema';
import TextField from '@material-ui/core/TextField';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';

Actions.registerEffect('addView', {
  fn({ data: { name }, target }) {

    if (name.length < 2) {
      throw new Meteor.Error(
        'effects:create-view:name-too-short',
        "The view's name must be at least 3 characters long."
      )
    }
    const hasMainView = Data.findOne({ isMainView: true, root: target._id })
    return Data.insert({
      name,
      type: 'view',
      root: target._id,
      isMainView: hasMainView ? false : true,
      order: [],
      isPublic: true,
    });
  },
  dataSchema() {
    return new SimpleSchema({
      name: {
        type: String
      },
    })
  },
  form(data, onChange) {
    const { name = '' } = data;
    return (
      <TextField
        key="view-name"
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
