import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styled } from '@material-ui/core/styles';
import { useTracker } from 'meteor/react-meteor-data';

import Data from '/imports/core/Data';
import Links from '/imports/ui/AppBar/SpaceMenu/Links';
import { Context } from '/imports/ui/_providers/ContextProvider';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const StyledSpaceName = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  userSelect: 'none',
  marginRight: theme.spacing(1)
}))

const StyledHomeButton = styled(({ hasBurger, ...rest }) => <div {...rest} />)({
  transform: ({ hasBurger }) => { return hasBurger ? 'translateX(0)' : 'translateX(-48px)' },
  transition: 'transform 0.1s linear',
  display: 'flex',
  alignItems: 'center'
})

const HomeButton = () => {
  const { context } = useContext(Context);
  const history = useHistory();
  const { isEdited, setMenuOpen, isMenuOpen = false } = useContext(UIContext);
  const viewCount = useTracker(() => {
    return Data.find({ type: 'view', root: context._id }).count();
  })

  const goHome = () => {
    history.push(history.location.pathname);
  }
  const handleOpen = () => {
    setMenuOpen(true);
  }
  const handleClose = () => {
    setMenuOpen(false);
  }
  const hasBurger = !isEdited && viewCount > 1;

  return (
    <StyledHomeButton hasBurger={hasBurger}>
      <IconButton
        aria-label="space-menu"
        edge='start'
        onClick={handleOpen}
        disabled={!hasBurger}
      >
        <MenuIcon/>
      </IconButton>
      <StyledSpaceName
        variant="h6"
        onClick={goHome}
      >
        {context.name}
      </StyledSpaceName>
      <Drawer open={isMenuOpen} onClose={handleClose}>
        <Links close={handleClose}/>
      </Drawer>
    </StyledHomeButton>
  )
}

export default HomeButton;
