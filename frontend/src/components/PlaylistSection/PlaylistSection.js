import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { getPlaylists } from "../../functions";
import Playlist from "./Playlist/Playlist";

function PlaylistSection({ setQueue, setNowPlaying, nowPlaying, queue, addSongToQueue }) {
  let playlists = getPlaylists();

  if (!playlists.length > 0) {
    return (
      <Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            😞 There are no playlists.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box align="center">
      <Typography variant="h4">Playlists</Typography>

      {playlists.map((playlist) => {
        return (
          <Playlist
            key={playlist.id}
            playlist={playlist}
            editable
            {...{
              setQueue,
              setNowPlaying,
              nowPlaying,
              queue,
              addSongToQueue,
            }}
          />
        );
      })}
    </Box>
  );
}

export default PlaylistSection;
