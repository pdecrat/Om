import React from 'react';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const StyledViewActionBar = styled(Box)({
  height: '32px',
  margin: 0
})

const ViewActionBar = () => {
  return (
    <StyledViewActionBar>
      <TextField
        label="View"
      />
    </StyledViewActionBar>
  )
}

export default ViewActionBar;
