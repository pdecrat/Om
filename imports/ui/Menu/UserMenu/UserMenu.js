import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { UserContext } from '/imports/ui/UserTracker';
import Register from '/imports/ui/Menu/UserMenu/Register';

const UserMenu = () => {
  const { user } = useContext(UserContext);

  return user ?
    <IconButton
      edge="end"
      color="inherit"
      aria-label="usermenu"
    >
      <Avatar>
        {user.name}
      </Avatar>
    </IconButton>
    : <Register />
}

export default UserMenu;
