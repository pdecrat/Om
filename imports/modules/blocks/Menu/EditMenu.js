import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { styled } from '@material-ui/core/styles';

import Blocks from '/imports/core/Blocks';
import UserMenu from '/imports/ui/AppBar/UserMenu/UserMenu';
import SpaceMenu from '/imports/ui/AppBar/SpaceMenu/SpaceMenu';

const StyledEditBar = styled(AppBar)({
  backgroundColor: 'white'
});

Blocks.register('EditMenu', () => {
  return (
    <StyledEditBar
      elevation={2}
      color='primary'
    >
      <Toolbar variant="dense">
        <SpaceMenu />
        <UserMenu />
      </Toolbar>
      <Toolbar variant="dense">
      </Toolbar>
    </StyledEditBar>
  );
});
