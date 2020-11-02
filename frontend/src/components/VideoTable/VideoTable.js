import React from "react";
import { Grid, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from "@material-ui/core";
import VideoRow from "./VideoRow/VideoRow";
import GridOnIcon from '@material-ui/icons/GridOn';

function VideoTable({ videos, nowPlaying, setNowPlaying, queue, setQueue, setSearchTableViewMode }) {
  if (!(videos && videos.results && videos.results.length > 0 && videos.searchTerm)) {
    return <div></div>;
  }
  console.log("vidoes: ", videos)
  return (
    <Box mt={4} id="video-grid">
      <Box m={2}>
        <Typography>
          Search Results for <i>{videos.searchTerm}</i>
        </Typography>
        <IconButton
          edge="end"
          title="toggle light/dark theme"
          onClick={() => setSearchTableViewMode(false)}
          target="_blank"
        >
          <GridOnIcon />
        </IconButton>
      </Box>
      <Grid container justify="center" alignItems="center">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Play</TableCell>
                <TableCell>Queue</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>View Count</TableCell>
                <TableCell>Thumbnail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.results.map((video) => {
                return (
                  <VideoRow
                    video={video}
                    nowPlaying={nowPlaying}
                    setNowPlaying={setNowPlaying}
                    queue={queue}
                    setQueue={setQueue}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}

export default VideoTable;
