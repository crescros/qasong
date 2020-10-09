import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import VideoCard from "./VideoCard/VideoCard";

function VideoGrid({ videos, nowPlaying, setNowPlaying, queue, setQueue }) {
  return (
    <Box style={{ marginTop: "60px" }}>
      {queue.length > 0 && nowPlaying && (
        <Box m={2}>
          <Typography>Search Results</Typography>
        </Box>
      )}
      <Grid container direction="row" justify="center" alignItems="center">
        {videos.map((video) => {
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

        {videos.length == 0 && (
          <>
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
          </>
        )}
      </Grid>
    </Box>
  );
}

export default VideoGrid;
