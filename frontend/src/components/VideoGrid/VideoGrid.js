import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import VideoCard from "./VideoCard/VideoCard";

function VideoGrid({ videos, nowPlaying, setNowPlaying, queue, setQueue }) {

  if (!(videos && videos.results && videos.results.length > 0 && videos.searchTerm)) {
    return (
      <Box mt={4}>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6}>
            <Typography
              align="center"
              variant="h1"
              style={{ color: "black", fontSize: "8vw" }}
              xs={12}
            >
              {process.env.REACT_APP_NAME.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              style={{
                color: "#888888",
                letterSpacing: "2px",
                wordSpacing: "16px",
              }}
            >
              {process.env.REACT_APP_TAGLINE}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box mt={4}>
      <Box m={2}>
        <Typography>Search Results for <i>{videos.searchTerm}</i></Typography>
      </Box>
      <Grid container direction="row" justify="center" alignItems="center">
        {videos.results.map((video) => {
          const url = video.thumbnail;
          const smallUrl = video.thumbnail;
          const title = video.title;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.videoId} p={2}>
              <Box m={1}>
                <VideoCard
                  id={video.videoId}
                  thumbnailUrl={url}
                  smallThumbnailUrl={smallUrl}
                  title={title}
                  description={video.description}
                  nowPlaying={nowPlaying}
                  setNowPlaying={setNowPlaying}
                  queue={queue}
                  setQueue={setQueue}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default VideoGrid;
