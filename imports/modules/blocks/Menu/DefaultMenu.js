import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import Blocks from '/imports/core/Blocks';
import UserMenu from '/imports/ui/AppBar/UserMenu/UserMenu';
import SpaceMenu from '/imports/ui/AppBar/SpaceMenu/SpaceMenu';

Blocks.register('DefaultMenu', () => {
  return (
    <AppBar
      color='primary'
      elevation={2}
    >
      <Toolbar variant="dense">
        <SpaceMenu />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
});
