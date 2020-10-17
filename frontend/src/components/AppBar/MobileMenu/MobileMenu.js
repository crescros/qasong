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

import { copyCurrentURL } from "../../../functions";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import MoreIcon from "@material-ui/icons/MoreVert";
import ReplyIcon from "@material-ui/icons/Reply";

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function MobileMenu({ queue, showQueue, setShowQueue, darkMode, setDarkMode }) {
  const classes = useStyles();

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
              onClick={() => setShowQueue(!showQueue)}
            >
              <IconButton
                disabled={queue.length === 0}
                target="_blank"
                color={showQueue ? "secondary" : "inherit"}
              >
                <Badge badgeContent={queue.length} color="secondary">
                  <QueueMusicIcon style={{ fontSize: "40px" }} />
                </Badge>
              </IconButton>
              <p>{showQueue ? "Hide Queue" : "Show Queue"}</p>
            </MenuItem>
          </Box>
        </Tooltip>
        {/* share  */}
        <Tooltip
          title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}
        >
          <Box>
            <MenuItem disabled={queue.length === 0} onClick={copyCurrentURL}>
              <IconButton target="_blank">
                <ReplyIcon />
              </IconButton>
              <p>Copy Link to Queue</p>
            </MenuItem>
          </Box>
        </Tooltip>

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
