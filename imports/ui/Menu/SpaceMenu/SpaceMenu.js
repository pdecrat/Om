import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import Drawer from '@material-ui/core/Drawer';

import { Context } from '/imports/ui/providers/ContextProvider';
import { InterfaceContext } from '/imports/ui/Interface';
import Links from '/imports/ui/Menu/SpaceMenu/Links';
import Grower from '/imports/ui/components/Grower';
import useUI from '/imports/ui/hooks/useUI';

const SpaceMenu = () => {
  const { isMenuOpen, setMenuOpen, isEdited, setEdit } = useContext(InterfaceContext);
  const { context } = useContext(Context)
  const handleClose = () => { setMenuOpen(false) }
  const toggle = () => { setMenuOpen(!isMenuOpen) }
  const toggleEdit = () => { setEdit(!isEdited) }

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggle}
      >
        <MenuIcon/>
      </IconButton>
      <Typography variant="h6" style={{
        textTransform: 'capitalize',
        userSelect: 'none'
      }}>
        {context.name}
      </Typography>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleClose}
      >
        <Links close={handleClose} />
      </Drawer>
      <Backdrop
        open={isMenuOpen}
        onClick={handleClose}
      />
      <Grower />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="edit"
        onClick={toggleEdit}
      >
        <MenuIcon/>
      </IconButton>
    </React.Fragment>
  )
}

export default SpaceMenu;
