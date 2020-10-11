import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Badge,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import VideoSearch from "./VideoSearch/VideoSearch";
import EnvironmentBadges from "./EnvironmentBadges/EnvironmentBadges";
import MoreIcon from "@material-ui/icons/MoreVert";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReplyIcon from '@material-ui/icons/Reply';
import Tooltip from '@material-ui/core/Tooltip'
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  searchTerm,
  setSearchTerm,
  showQueue,
  setShowQueue,
  queue,
  darkMode,
  setDarkMode,
  isLoading,
  setVideos
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogoClick = () => {
    setSearchTerm("")
    setVideos([])
    setShowQueue(false)
  }

  const handleCopyCurrentURL = () => {
    var dummy = document.createElement("textarea");

    document.body.appendChild(dummy);

    dummy.value = location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Join Us</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
      <Tooltip title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}>
        <Box>
          <MenuItem
            disabled={queue.length === 0}
            onClick={() => setShowQueue(!showQueue)}>
            <IconButton
              disabled={queue.length === 0}
              target="_blank"
              color={showQueue ? "secondary" : "inherit"}>
              <Badge badgeContent={queue.length} color="secondary">
                <QueueMusicIcon style={{ fontSize: "40px" }} />
              </Badge>
            </IconButton>
            <p>{showQueue ? "Hide Queue" : "Show Queue"}</p>
          </MenuItem>
        </Box>
      </Tooltip>
      {/* share  */}
      <Tooltip title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}>
        <Box>
          <MenuItem
            disabled={queue.length === 0}
            onClick={handleCopyCurrentURL}
          >
            <IconButton
              target="_blank"
            >
              <ReplyIcon />
            </IconButton>
            <p>Copy Link to Queue</p>
          </MenuItem>
        </Box>
      </Tooltip>

      {/* dark mode */}
      <MenuItem onClick={() => setDarkMode(!darkMode)} >
        {/* dark mode slider mobile */}
        <Switch checked={darkMode} />
        <p>Dark Mode</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position={isMobile ? "fixed" : "static"}>
        <Toolbar>
          {/* Icon-logo */}
          <IconButton
            onClick={handleLogoClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Artistify logo"
          >
            <img src=".\icon-logo.svg" height="48px" />
          </IconButton>
          {/* Development Badge */}
          <EnvironmentBadges />

          {/* Artistify name from frontend .env */}
          <Typography
            display="inline"
            style={{ marginRight: "20px" }}
          >
            {process.env.REACT_APP_NAME}
          </Typography>
          {/* Search bar */}
          <VideoSearch
            handleSearchTermInput={handleSearchTermInput}
            handleSubmitVideoSearch={handleSubmitVideoSearch}
            searchTerm={searchTerm}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
          />

          <Box mx={2}>
            {isLoading && <CircularProgress color="secondary" size="32px" />}
          </Box>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {/* Darkmode slider */}
            <FormControlLabel
              style={{ color: "white" }}
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label={darkMode ? "dark mode" : "light mode"}
              color="red"
            />

            {/* queue button  */}
            <Tooltip title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}>
              <Box>
                <IconButton
                  disabled={queue.length === 0}
                  edge="end"
                  title={showQueue ? "hide queue" : "show queue"}
                  color={showQueue ? "secondary" : "inherit"}
                  onClick={() => setShowQueue(!showQueue)}
                  target="_blank"
                >
                  <Badge badgeContent={queue.length} color="secondary">
                    <QueueMusicIcon style={{ fontSize: "40px" }} />
                  </Badge>
                </IconButton>
              </Box>
            </Tooltip>

            {/* share button */}
            <Tooltip title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}>
              <Box mt={1}>
                <IconButton
                  edge="end"
                  title="Copy Link to Current Queue"
                  disabled={queue.length === 0}
                  onClick={handleCopyCurrentURL}
                  target="_blank"
                  color={queue.length === 0 ? "inherit" : "secondary"}
                >
                  <ReplyIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </div>

          {/* More Icon/button */}
          <div className={classes.sectionMobile}>
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
