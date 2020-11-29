import React from "react";
import { Grid, Typography, Box, IconButton } from "@material-ui/core";
import VideoCard from "./ResultCard/ResultCard";
import TableChartIcon from "@material-ui/icons/TableChart";

function GridView({
  searchResults,
  nowPlaying,
  setNowPlaying,
  queue,
  setQueue,
  setSearchTableViewMode,
}) {
  return (
    <Box mt={4} id="video-grid">
      <Box m={2}>
        <Typography justify="center">
          Search Results for <i>{searchResults.searchTerm}</i>
        </Typography>
        <IconButton
          edge="end"
          title="toggle light/dark theme"
          onClick={() => setSearchTableViewMode(true)}
          target="_blank"
        >
          <TableChartIcon />
        </IconButton>
      </Box>
      <Grid container direction="row" justify="center" alignItems="center">
        {searchResults.results.map((video) => {
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

export default GridView;
