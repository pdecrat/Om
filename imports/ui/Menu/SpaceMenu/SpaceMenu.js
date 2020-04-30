import React, { useContext, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import Drawer from '@material-ui/core/Drawer';

import { Context } from '/imports/ui/ContextTracker';
import Links from '/imports/ui/Menu/SpaceMenu/Links';

const Grower = styled('div')({
  flexGrow: 1,
});

const SpaceMenu = () => {
  const [isMenuOpen, open] = useState(false);
  const {
    context,
  } = useContext(Context)
  const handleClose = () => { open(false) }

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={e => { open(!isMenuOpen) }}
      >
        <MenuIcon/>
      </IconButton>
      <Avatar>
        {context.name}
      </Avatar>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={e => { open(false) }}
      >
        <Links close={handleClose} />
      </Drawer>
      <Backdrop
        open={isMenuOpen}
        onClick={e => { open(false) }}
      />
      <Grower />

    </React.Fragment>
  )
}

export default SpaceMenu;
