import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { ViewContext } from '/imports/ui/_providers/ViewProvider';

const StyledViewActionBar = styled(Box)({
  height: '48px',
})

const ViewActionBar = () => {
  const { view } = useContext(ViewContext);

  return (
    <StyledViewActionBar>
      <TextField
        label="View"
        value={view.name}
      />
    </StyledViewActionBar>
  )
}

export default ViewActionBar;
