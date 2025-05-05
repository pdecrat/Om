import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { UserContext } from '/imports/ui/_providers/UserProvider';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));

const UserMenuButton = () => {
  const { user } = useContext(UserContext);

  return (
    <StyledAvatar>
      {user ? user.name : "Hello"}
    </StyledAvatar>
  );
}

export default UserMenuButton;
