import React, { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import Data from '/imports/core/Data';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';

const EditToolbar = () => {
  const { context } = useContext(Context);
  const { view } = useContext(ViewContext);
  const history = useHistory();
  const views = useTracker(() => Data.find({
    type: 'view',
    root: context.root
  }).fetch());

  const changeView = e => {
    history.push(`${history.location.pathname}?view=${e.target.value}`)
  }


  return (
    <Toolbar variant="dense">
      <FormControl>
        <InputLabel id="demo-simple-select-label">View</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={view.name}
          onChange={changeView}
        >
          {views.map(view => <MenuItem
            key={view._id}
            value={view.name}
            >{view.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Toolbar>

  )
}

export default EditToolbar;
