import React from "react";
import { Typography } from "@material-ui/core";
import { getPlaylists } from "../../functions";

function PlaylistSection() {
  let playlists = getPlaylists();

  return (
    <>
      <Typography align="center" variant="h1">
        {JSON.stringify(playlists)}
      </Typography>
    </>
  );
}

export default PlaylistSection;
