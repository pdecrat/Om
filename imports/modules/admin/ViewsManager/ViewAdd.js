import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PostAdd from '@material-ui/icons/PostAdd';
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
import Button from '@material-ui/core/Button';

import '/imports/modules/admin/ViewsManager/effects/add-view.js';
import { Context } from '/imports/ui/ContextTracker';

const ViewAdd = () => {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { call } = useContext(Context);

  const handleClose = () => setOpen(false);
  const addView = () => {
    call({
      name: "createView",
      data: { name }
    }, (err) => {
      if (!err) {
        setName('');
        setOpen(false)
      };
    })
  }

  return (
    <React.Fragment>
      <IconButton
        edge='end'
        aria-label="add-view"
        style={{ float: 'right' }}
        onClick={e => { setOpen(true) }}
      >
        <PostAdd />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle id="form-dialog-title">Créer une vue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ajouter une vue à votre espace.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            type="text"
            fullWidth
            value={name}
            onChange={e => { setName(e.target.value) }}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={addView} color="primary">
              Créer la vue
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ViewAdd;
