import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { UserContext } from '/imports/ui/_providers/UserProvider';
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));

const UserMenuButton = () => {
  const { user } = useContext(UserContext);

  return (
    <IconButton
      edge='end'
      aria-label="user menu"
    >
      <StyledAvatar>
        {user.name}
      </StyledAvatar>
    </IconButton>
  );
}

export default UserMenuButton;
