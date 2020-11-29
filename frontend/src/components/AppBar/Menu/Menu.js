import React from "react";
import { Menu, IconButton, MenuItem, Badge, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import MoreIcon from "@material-ui/icons/MoreVert";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  sectionMobile: {
    display: "flex",
  },
});

function MobileMenu({ queueLength, darkMode, setDarkMode, setShowAboutUs }) {
  const classes = useStyles();

  let history = useHistory();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function handleQueueButtonClick() {
    history.push("/queue");
  }

  function handleBillboardClick() {
    history.push("/billboard");
  }

  function handleDarkmodeButtonClick() {
    setDarkMode(!darkMode);
  }

  function handleAboutUsClick() {
    setShowAboutUs(true);
    history.push("/");
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <div className={classes.sectionMobile}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {/* QUEUE */}

        <MenuItem onClick={handleQueueButtonClick}>
          queue
          <IconButton target="_blank" color="inherit" size="small">
            <Badge badgeContent={queueLength} color="secondary">
              <QueueMusicIcon />
            </Badge>
          </IconButton>
        </MenuItem>

        {/* dark mode */}
        <MenuItem onClick={handleDarkmodeButtonClick}>
          dark mode
          <Switch checked={darkMode} />
        </MenuItem>

        <MenuItem onClick={handleAboutUsClick}>about us</MenuItem>
        <MenuItem onClick={handleBillboardClick}>billboard top 100</MenuItem>
      </Menu>

      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <Badge badgeContent={queueLength} color="secondary">
          <MoreIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

export default MobileMenu;
