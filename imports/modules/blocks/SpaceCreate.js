import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/IconButton';
import { useHistory, useLocation } from 'react-router-dom';

import Blocks from '/imports/core/Blocks';
import { Context } from '/imports/ui/ContextTracker';

Blocks.register('SpaceCreate', () => {
  const [name, setName] = useState('');
  const { call } = useContext(Context);
  const history = useHistory();

  const changeName = e => setName(e.target.value);
  const launchToSpace = () => {
    call({
      name: 'createSpace',
      data: { name }
    }, (err) => {
      if (!err)
        history.push('/s/' + name.toLowerCase().split(' ').join('-'));
    })
  }
  return (
    <React.Fragment>
      <TextField
        value={name}
        onChange={changeName}
        label="Nommez votre espace"
      />
      <Button onClick={launchToSpace}>Launch !</Button>
    </React.Fragment>
  )
});
