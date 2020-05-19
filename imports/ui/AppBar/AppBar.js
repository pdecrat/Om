import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import UserMenu from '/imports/ui/AppBar/UserMenu/UserMenu';
import SpaceMenu from '/imports/ui/AppBar/SpaceMenu/SpaceMenu';
import EditSlider from '/imports/ui/AppBar/EditSlider';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const StyledAppBar = styled(MuiAppBar)({
  transition: 'background-color 0.1s linear, box-shadow .1s linear',
})

const AppBar = () => {
  const { setEdit, isEdited } = useContext(UIContext);

  return (
    <StyledAppBar
      color={isEdited ? 'secondary' : 'primary' }
      elevation={isEdited ? 0 : 2}
    >
      <Toolbar variant="dense">
        <SpaceMenu />
        <UserMenu />
      </Toolbar>
      <EditSlider />
    </StyledAppBar>
  );
}

export default AppBar;
