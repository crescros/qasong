import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import VideoSearch from "./VideoSearch/VideoSearch";
import MobileMenu from "./MobileMenu/MobileMenu";
import EnvironmentBadges from "./EnvironmentBadges/EnvironmentBadges";
import { isMobile } from "react-device-detect";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
// import UserSection from "./UserSection/UserSection";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function PrimarySearchAppBar({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  showHomeScreen,
  searchTerm,
  setSearchTerm,
  showQueue,
  setShowQueue,
  queue,
  darkMode,
  setDarkMode,
  isLoading,
  setVideos,
  setNowPlaying
  // user,
  // setUser,
}) {
  const classes = useStyles();

  const handleLogoClick = () => {
    setSearchTerm("");
    setVideos([]);
    setNowPlaying({});
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
          {!showHomeScreen && (
            <VideoSearch
              handleSearchTermInput={handleSearchTermInput}
              handleSubmitVideoSearch={handleSubmitVideoSearch}
              searchTerm={searchTerm}
              style={{
                margin: "0 auto",
                maxWidth: 800,
              }}
            />
          )}

          {/* Search Bar Loading Indicator */}
          <Box mx={2}>
            {" "}
            {isLoading && <CircularProgress color="secondary" size="32px" />}{" "}
          </Box>

          {/* responsive spacer */}
          <div className={classes.grow} />

          {/* Menus */}
          <DesktopMenu {...{ queue, showQueue, setShowQueue, darkMode, setDarkMode }} />
          <MobileMenu {...{ queue, showQueue, setShowQueue, darkMode, setDarkMode }} />

          {/* <UserSection {...{user, setUser, darkMode, setDarkMode}}/> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
