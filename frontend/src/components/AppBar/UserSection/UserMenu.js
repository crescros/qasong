import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

function UserMenu({
  handleLogOut,
  handleMenuClose,
  menuOpen,
  anchorEl,
  setGlobalChatOpen,
}) {
  const handleOpenChat = () => {
    setGlobalChatOpen(true);
  };

  return (
    <Menu
      keepMounted
      anchorPosition={{ top: 20, left: 20 }}
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      <MenuItem onClick={handleOpenChat}>Chat</MenuItem>
    </Menu>
  );
}

export default UserMenu;
