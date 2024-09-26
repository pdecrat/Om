import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { UserContext } from '/imports/ui/_providers/UserProvider';
import Register from '/imports/ui/AppBar/UserMenu/Register';
import UserMenuButton from '/imports/ui/AppBar/UserMenu/UserMenuButton';

const StyledUserMenu = styled('div')({
  // float: 'right'
});
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const UserMenu = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const menuItems = useTracker(() => {
    if (user && user._id) {
      const results = Data.find({
        root: user._id,
        type: "menuItem",
      }).fetch();

      console.log(results)
      return results;
    }
    return [];
  });
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledUserMenu>
      <Tooltip title="Open settings">
        <IconButton
          edge='end'
          aria-label="user menu"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <UserMenuButton />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.label} onClick={e => {
            handleCloseUserMenu()
            history.push(`/u/${user._id}?view=${menuItem.label}`);
          }}>
            <Typography textAlign="center">{menuItem.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </StyledUserMenu>
  );
}

export default UserMenu;
