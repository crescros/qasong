import React, { Suspense } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

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
  darkMode,
}) {
  const ytDevLogoUrl =
    "https://developers.google.com/" +
    `youtube/images/developed-with-youtube-lowercase-${darkMode ? "light" : "dark"}.png`;

  return (
    <Box mt={4}>
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
          <Box p={3}></Box>
        </Grid>

        <Grid item>
          <Box mx={4}>
            <Typography variant="h6">What is Qasong?</Typography>

            <Typography>Qasong is an ad free music streaming</Typography>

            <img
              style={{
                maxWidth: "100%",
                width: "400px",
              }}
              src={ytDevLogoUrl}
            />

            <Typography gutterBottom>
              if you&rsquo;re interested in contributing join or discord at discordlink
            </Typography>

            <Typography>or open source github something github.com</Typography>
          </Box>
        </Grid>

        <Grid item>{isLoading && <LoadingAnimation size="32px" />}</Grid>
        <Grid item>
          <Box mt={12}>
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
