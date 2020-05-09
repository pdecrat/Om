import React, { useState, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import '/imports/modules/admin/ViewsManager/effects/add-block.js';
import Blocks from '/imports/core/Blocks';
import { Context } from '/imports/ui/ContextTracker';

const BlockAdd = ({ viewId, viewOrder }) => {
  const [isOpen, setOpen] = useState(false);
  const [block, setBlock] = useState('Paragraph');
  const { call, context } = useContext(Context);

  const handleClose = () => setOpen(false);
  const addBlock = () => {
    call({
      name: 'addBlock',
      data: { name: block, viewOrder: viewOrder + 1 },
      target: { _id: viewId, root: context._id  }
    }, (err) => {
      if (!err) setOpen(false);
    })
  }

  return (
    <React.Fragment>
      <ListItem
        style={{ paddingLeft: '40px' }}
        button
        dense
        onClick={e => { setOpen(true) }}
      >
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="Ajouter un bloc" />
      </ListItem>
      <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle id="form-dialog-title">Ajouter un bloc</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-label">Type de bloc</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={block}
              onChange={e => { setBlock(e.target.value) }}
            >
              {Blocks.getAll().map(block =>
                <MenuItem key={block} value={block}>{block}</MenuItem>
              )}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={addBlock} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default BlockAdd;
