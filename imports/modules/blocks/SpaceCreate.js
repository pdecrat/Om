import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

import Blocks from '/imports/core/Blocks';
import useCall from '/imports/ui/_hooks/useCall';

Blocks.register('SpaceCreate', ({ block }) => {
  const [name, setName] = useState('');
  const call = useCall('createSpace');
  const history = useHistory();

  const changeName = e => setName(e.target.value);
  const launchToSpace = () => {
    call({ name }, (err) => {
      if (!err)
        history.push('/s/' + encodeURI(name));
    })
  }
  return (
    <React.Fragment>
      <TextField
        value={name}
        onChange={changeName}
        label={block.fieldText}
      />
      <Button onClick={launchToSpace}>{block.buttonText}</Button>
    </React.Fragment>
  )
});
