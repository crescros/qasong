import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import UserProfile from "./UserProfile/UserProfile";

function UserMenu({
  handleLogOut,
  handleMenuClose,
  menuOpen,
  anchorEl,
  user,
  darkMode,
  setDarkMode,
}) {
  return (
    <Menu
      keepMounted
      anchorPosition={{ top: 20, left: 20 }}
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleMenuClose}
    >
      <UserProfile {...{ user, darkMode, setDarkMode }} />
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );
}

export default UserMenu;
