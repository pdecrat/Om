import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { UserContext } from '/imports/ui/_providers/UserProvider';
import Blocks from '/imports/core/Blocks';
import UserMenu from '/imports/ui/AppBar/UserMenu/UserMenu';
import Register from '/imports/ui/AppBar/UserMenu/Register';
import SpaceMenu from '/imports/ui/AppBar/SpaceMenu/SpaceMenu';

Blocks.register('DefaultMenu', () => {
  const { user } = React.useContext(UserContext);

  return (
    <AppBar
      color='primary'
      elevation={2}
    >
      <Toolbar variant="dense">
        <SpaceMenu />
        { user ?
          <UserMenu />
          : <Register />
        }
      </Toolbar>
    </AppBar>
  );
});
