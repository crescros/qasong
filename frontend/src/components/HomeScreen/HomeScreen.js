import React, { Suspense } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import WelcomeWindow from "./WelcomeWindow/WelcomeWindow";
import Settings from "./Settings/Settings";

const FeaturedPlaylists = React.lazy(() =>
  import("./FeaturedPlaylists/FeaturedPlaylists")
);

function HomeScreen({
  setQueue,
  setNowPlaying,
  nowPlaying,
  isLoading,
  queue,
  addSongToQueue,
  showAboutUs,
  setShowAboutUs,
  showSettings,
  setShowSettings,
  darkMode,
  setDarkMode,
  playbackRate,
  setPlaybackRate,
}) {
  return (
    <Box mt={4}>
      <WelcomeWindow
        {...{
          showAboutUs,
          setShowAboutUs,
        }}
      />

      <Settings
        {...{
          showSettings,
          setShowSettings,
          darkMode,
          setDarkMode,
          setPlaybackRate,
          playbackRate,
        }}
      />

      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <Typography
            align="center"
            variant="h1"
            color="textSecondary"
            style={{ fontSize: "8vw" }}
            xs={12}
          >
            {process.env.REACT_APP_NAME}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            align="center"
            color="textSecondary"
            style={{
              letterSpacing: "2px",
              wordSpacing: "16px",
            }}
          >
            {process.env.REACT_APP_TAGLINE}
          </Typography>
        </Grid>

        <Grid item>
          <Box p={1}></Box>
        </Grid>

        <Grid item>{isLoading && <LoadingAnimation size="32px" />}</Grid>
        <Grid item>
          <Box mt={14}>
            <Suspense>
              <FeaturedPlaylists
                {...{
                  setQueue,
                  setNowPlaying,
                  nowPlaying,
                  queue,
                  addSongToQueue,
                }}
              />
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeScreen;
