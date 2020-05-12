import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { UserContext } from '/imports/ui/_providers/UserProvider';
import Register from '/imports/ui/Menu/UserMenu/Register';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));

const UserMenu = () => {
  const { user } = useContext(UserContext);

  return user ?
    <IconButton
      edge="end"
      color="inherit"
      aria-label="usermenu"
    >
      <StyledAvatar>
        {user.name}
      </StyledAvatar>
    </IconButton>
    : <Register />
}

export default UserMenu;
