import SimpleSchema from 'simpl-schema';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data.js';
import Blocks from '/imports/core/Blocks';

Actions.registerEffect('addBlock', {
  fn({ data: { name = 'paragraph' }, target }) {
    const count = Data.find({
      blockType: 'content',
      root: target.root,
      viewId: target._id,
    }).count()
    Data.insert({
      name,
      viewOrder: count + 1,
      type: 'block',
      blockType: 'content',
      root: target.root,
      viewId: target._id,
      isActive: true,
      isPublic: true,
    })
  },
  dataSchema: new SimpleSchema({
    name: {
      type: String
    }
  }),
  form(data, onChange) {
    const { name = 'paragraph' } = data;

    return (
      <FormControl key="block-name" fullWidth>
        <InputLabel id="select-label">Type de bloc</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={name}
          onChange={onChange('name')}
        >
          {Blocks.getAll().map(block =>
            <MenuItem key={block} value={block}>{block}</MenuItem>
          )}
        </Select>
      </FormControl>
    )
  }
});
