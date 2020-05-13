import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import SpaceMenu from '/imports/ui/Menu/SpaceMenu/SpaceMenu';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const Menu = () => {
  const { isEdited } = useContext(UIContext);
  return (
    <AppBar color={ isEdited ? 'transparent' : 'primary' }>
      <Toolbar variant="dense">
        <SpaceMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Menu;
