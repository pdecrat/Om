import React from 'react';
import SimpleSchema from 'simpl-schema';
import TextField from '@material-ui/core/TextField';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data';

Actions.registerEffect('editTextField', {
  fn({ data, target, options: { fieldToChange } }) {
    const modification = {
      [fieldToChange]: data[fieldToChange]
    };
    Data.update(target, { $set: { ...modification } })
  },
  dataSchema({ fieldToChange }) {
    return new SimpleSchema({
      [fieldToChange]: {
        type: String
      }
    })
  },
  form(data, onChange, { fieldToChange, isMultiline = false }) {
    const value = data[fieldToChange]

    return (
      <TextField
        key={fieldToChange}
        margin="dense"
        label={fieldToChange}
        type="text"
        fullWidth
        multiline={isMultiline}
        rows={4}
        value={value}
        onChange={onChange(fieldToChange)}
      />
    )
  }
})
