import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@material-ui/core";
import VideoSearch from "./VideoSearch/VideoSearch";
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
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
}) {
  const classes = useStyles();

  const handleLogoClick = () => {
    setSearchTerm("");
    setVideos([]);
    setShowQueue(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar color="transparent">
        <Toolbar>
          {/* Icon-logo */}
          <IconButton
            onClick={handleLogoClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Qasong logo"
          >
            <img src=".\img\whiteLogo.png" height="40px" />
          </IconButton>

          {/* Search bar */}
          {!showHomeScreen && (
            <>
              {/* Artistify name from frontend .env */}
              <Typography display="inline" style={{ marginRight: "20px" }}>
                {process.env.REACT_APP_NAME}
              </Typography>
              <VideoSearch
                handleSearchTermInput={handleSearchTermInput}
                handleSubmitVideoSearch={handleSubmitVideoSearch}
                searchTerm={searchTerm}
                style={{
                  margin: "0 auto",
                  maxWidth: 800,
                }}
              />
              {/* Search Bar Loading Indicator */}
              <Box mx={2}> {isLoading && <LoadingAnimation size="32px" />} </Box>
            </>
          )}

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
