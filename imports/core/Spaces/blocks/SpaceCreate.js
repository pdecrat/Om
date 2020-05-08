import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/IconButton';
import { useHistory, useLocation } from 'react-router-dom';

import '/imports/core/Spaces/effects/create-space';
import { Context } from '/imports/ui/ContextTracker';

const SpaceCreate = () => {
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
}

export default SpaceCreate;
