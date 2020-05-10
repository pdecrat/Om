import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import Drawer from '@material-ui/core/Drawer';

import { Context } from '/imports/ui/ContextTracker';
import Links from '/imports/ui/Menu/SpaceMenu/Links';
import Grower from '/imports/ui/components/Grower';

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
      <Typography variant="h6" style={{
        textTransform: 'capitalize',
        userSelect: 'none'
      }}>
        {context.name}
      </Typography>
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
