import React from 'react';
import SimpleSchema from 'simpl-schema';

import Actions from '/imports/core/Actions';
import Spaces from '/imports/core/Spaces/Spaces';

Actions.registerEffect('createSpace', {
  fn({ data: { name = '' } }) {
    if (name.length < 2) {
      throw new Meteor.Error(
        'effects:create-space:name-too-short',
        "The space's name must be at least 3 characters long."
      )
    }
    return Spaces.insert({ name })
  },
  dataSchema() {
    return new SimpleSchema({
      name: {
        type: String
      },
    })
  },
  form(data, onChange) {
    return null
  }
});
