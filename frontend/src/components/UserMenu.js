import React, { useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'

function UserMenu({ handleLogOut, handleMenuClose, menuOpen, anchorEl }) {

    return (
        <Menu
            keepMounted
            anchorPosition={{ top: 20, left: 20 }}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            children={<MenuItem onClick={handleLogOut}>Logout</MenuItem>}
        />
    )
}

export default UserMenu
