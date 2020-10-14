import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  FormControlLabel,
  Box,
  Switch,
  Tooltip
} from "@material-ui/core";
import VideoSearch from "./VideoSearch/VideoSearch";
import MobileMenu from "./MobileMenu/MobileMenu"
import EnvironmentBadges from "./EnvironmentBadges/EnvironmentBadges";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import ReplyIcon from "@material-ui/icons/Reply";
import { isMobile } from "react-device-detect";
import { copyCurrentURL} from "../../functions"


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
  setVideos,
}) {
  const classes = useStyles();

  const handleLogoClick = () => {
    setSearchTerm("");
    setVideos([]);
    setShowQueue(false);
  };

 

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
          <Typography display="inline" style={{ marginRight: "20px" }}>
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
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              }
              label={darkMode ? "dark mode" : "light mode"}
              color="red"
            />

            {/* queue button  */}
            <Tooltip
              title={
                queue.length === 0 ? "Search for songs and add them to your queue" : ""
              }
            >
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
            <Tooltip
              title={
                queue.length === 0 ? "Search for songs and add them to your queue" : ""
              }
            >
              <Box mt={1}>
                <IconButton
                  edge="end"
                  title="Copy Link to Current Queue"
                  disabled={queue.length === 0}
                  onClick={copyCurrentURL}
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

            <MobileMenu {...{queue, showQueue, setShowQueue, darkMode, setDarkMode}} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
