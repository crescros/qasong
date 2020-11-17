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

function MobileMenu({ queue, darkMode, setDarkMode }) {
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
          title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}
        >
          <Box>
            <MenuItem
              disabled={queue.length === 0}
              onClick={() => history.push("/queue")}
            >
              <IconButton disabled={queue.length === 0} target="_blank" color="inherit">
                <Badge badgeContent={queue.length} color="secondary">
                  <QueueMusicIcon style={{ fontSize: "40px" }} />
                </Badge>
              </IconButton>
              <p>queue</p>
            </MenuItem>
          </Box>
        </Tooltip>
        <MenuItem onClick={() => history.push("/billboard")}>
          <IconButton target="_blank" color="inherit">
            <QueueMusicIcon style={{ fontSize: "40px" }} />
          </IconButton>
          <p>billboard</p>
        </MenuItem>

        {/* dark mode */}
        <MenuItem onClick={() => setDarkMode(!darkMode)}>
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
        <Badge badgeContent={queue.length} color="secondary">
          <MoreIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

export default MobileMenu;
