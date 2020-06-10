import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useCall from '/imports/ui/_hooks/useCall';

const Register = () => {
  const [email, setEmail] = useState('');
  const [isOpen, setOpen] = useState(false);
  const call = useCall('register user');
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const registerUser = () => {
    call({ email, url: location.pathname }, (err, res) => {
      if (!err) setOpen(false);
    })
  }

  return (
    <React.Fragment>
      <IconButton
        aria-label="create account"
        onClick={handleOpen}
        edge='end'
      >
        <PersonAddIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle id="form-dialog-title">Créer un compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Renseignez votre email pour créer un compte.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            id="email"
            type="email"
            fullWidth
            value={email}
            onChange={e => { setEmail(e.target.value) }}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={registerUser} color="primary">
              Créer le compte
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default Register
