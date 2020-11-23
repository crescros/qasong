import React from "react";
import {
  Menu,
  Tooltip,
  Box,
  IconButton,
  MenuItem,
  Badge,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import MoreIcon from "@material-ui/icons/MoreVert";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function MobileMenu({ queueLength, darkMode, setDarkMode }) {
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

  function handleDarkmodeButtonClick() {
    setDarkMode(!darkMode);
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
        <Tooltip
          title={queueLength === 0 ? "Search for songs and add them to your queue" : ""}
        >
          <Box>
            <MenuItem disabled={queueLength === 0} onClick={handleQueueButtonClick}>
              <IconButton disabled={queueLength === 0} target="_blank" color="inherit">
                <Badge badgeContent={queueLength} color="secondary">
                  <QueueMusicIcon style={{ fontSize: "40px" }} />
                </Badge>
              </IconButton>
              <p>queue</p>
            </MenuItem>
          </Box>
        </Tooltip>

        {/* dark mode */}
        <MenuItem onClick={handleDarkmodeButtonClick}>
          {/* dark mode slider mobile */}
          <Switch checked={darkMode} />
          <p>Dark Mode</p>
        </MenuItem>
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
