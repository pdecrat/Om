import React, { useState, useContext } from 'react';
import { styled } from '@material-ui/core/styles';

import { UserContext } from '/imports/ui/_providers/UserProvider';
import Register from '/imports/ui/AppBar/UserMenu/Register';
import UserMenuButton from '/imports/ui/AppBar/UserMenu/UserMenuButton';

const StyledUserMenu = styled('div')({
  // float: 'right'
});

const UserMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <StyledUserMenu>
      { user ?
        <UserMenuButton />
        : <Register />
      }
    </StyledUserMenu>
  );
}

export default UserMenu;
