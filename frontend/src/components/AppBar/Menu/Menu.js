import React from "react";
import { Menu, IconButton, MenuItem, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import MoreIcon from "@material-ui/icons/MoreVert";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: "transparent",
    backdropFilter: `blur(2px) brightness(${
      theme.palette.type === "dark" ? "45%" : "95%"
    } )`,
    boxShadow: "none",
  },
}));

function MobileMenu({ queueLength, setShowAboutUs, setShowSettings, setShowFeedback }) {
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
    handleMobileMenuClose();
  }

  function handleBillboardClick() {
    history.push("/billboard");
    handleMobileMenuClose();
  }

  function handlePlaylistClick() {
    history.push("/playlists");
    handleMobileMenuClose();
  }

  function handleSettingsClick() {
    setShowSettings(true);
    history.push("/");
  }

  function handleAboutUsClick() {
    setShowAboutUs(true);
    history.push("/");
  }

  function handleFeedbackClick() {
    setShowFeedback(true);
    history.push("/");
    handleMobileMenuClose();
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <div>
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
        className={classes.backdrop}
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
        <MenuItem onClick={handlePlaylistClick}>playlists</MenuItem>
        <MenuItem onClick={handleBillboardClick}>billboard top 100</MenuItem>
        <MenuItem onClick={handleSettingsClick}>settings</MenuItem>
        <MenuItem onClick={handleFeedbackClick}>feedback</MenuItem>
        <MenuItem onClick={handleAboutUsClick}>about us</MenuItem>
      </Menu>

      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <Badge badgeContent={queueLength} color="secondary">
          <MoreIcon style={{ fontSize: 36 }} />
        </Badge>
      </IconButton>
    </div>
  );
}

export default MobileMenu;
