import React from "react";
import { Typography, Box } from "@material-ui/core";
import { getPlaylists } from "../../functions";
import Playlist from "./Playlist/Playlist";

function PlaylistSection() {
  let playlists = getPlaylists();

  if (!playlists.length > 0) {
    return <Typography align="center">no playlists </Typography>;
  }

  return (
    <Box align="center">
      <Typography variant="h4">Playlists</Typography>

      {playlists.map((playlist) => {
        return <Playlist key={playlist.id} playlist={playlist} editable />;
      })}
    </Box>
  );
}

export default PlaylistSection;
