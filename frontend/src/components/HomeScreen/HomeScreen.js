import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import FeaturedPlaylists from "./FeaturedPlaylists/FeaturedPlaylists";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
function HomeScreen({
  setQueue,
  setNowPlaying,
  nowPlaying,
  setQueueName,
  isLoading,
  queue,
  addSongToQueue,
}) {
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

        <Grid item></Grid>

        <Grid item>{isLoading && <LoadingAnimation size="32px" />}</Grid>
        <Grid item>
          <Box mt={12}>
            <FeaturedPlaylists
              {...{
                setQueue,
                setNowPlaying,
                nowPlaying,
                setQueueName,
                queue,
                addSongToQueue,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeScreen;
