import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';

import '/imports/modules/admin/ViewsManager/effects/edit-view.js';
import { Context } from '/imports/ui/ContextTracker';

const ViewEdit = ({ name = '', _id, root }) => {
  const [isOpen, setOpen] = useState(false);
  const [newName, setName] = useState(name);
  const { call, query } = useContext(Context);

  const handleClose = () => setOpen(false);
  const addView = () => {
    call({
      name: "editView",
      data: { name: newName },
      target: { _id, root }
    }, (err) => {
      if (!err) {
        setOpen(false)
      };
    })
  }

  return (
    <React.Fragment>
      <IconButton
        edge='end'
        aria-label="edit-view"
        onClick={e => { setOpen(true) }}
        disabled={ query.view === name ? true : false }
      >
        <SettingsIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle id="form-dialog-title">Modifier une vue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            type="text"
            fullWidth
            value={newName}
            onChange={e => { setName(e.target.value) }}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={addView} color="primary">
              Enregister
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ViewEdit;
