import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import { UserContext } from '/imports/ui/_providers/UserProvider';
import Register from '/imports/ui/UserMenu/Register';
import UserMenuButton from '/imports/ui/UserMenu/UserMenuButton';

const StyledButton = styled(IconButton)({
  float: 'right'
});

const UserMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <StyledButton
    color="inherit"
    aria-label="usermenu"
    >
      { user ?
        <UserMenuButton />
        : <Register />
      }
    </StyledButton>
  );
}

export default UserMenu;
