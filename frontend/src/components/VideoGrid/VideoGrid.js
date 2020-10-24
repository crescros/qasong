import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import VideoCard from "./VideoCard/VideoCard";

function VideoGrid({ videos, nowPlaying, setNowPlaying, queue, setQueue }) {
  if (!(videos && videos.results && videos.results.length > 0 && videos.searchTerm)) {
    return <div></div>;
  }

  return (
    <Box mt={4} id="video-grid">
      <Box m={2}>
        <Typography>
          Search Results for <i>{videos.searchTerm}</i>
        </Typography>
      </Box>
      <Grid container direction="row" justify="center" alignItems="center">
        {videos.results.map((video) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.videoId} p={2}>
              <Box m={1} display="flex" justifyContent="center">
                <VideoCard
                  video={video}
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
