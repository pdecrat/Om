import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import UserMenu from '/imports/ui/Menu/UserMenu/UserMenu';
import SpaceMenu from '/imports/ui/Menu/SpaceMenu/SpaceMenu';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Menu = () => {
  return (
    <HideOnScroll >
      <AppBar>
        <Toolbar variant="dense">
          <SpaceMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default Menu;
