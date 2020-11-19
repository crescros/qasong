import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function SkipSongButton({ skipSong, disabled }) {
  return (
    <IconButton disabled={disabled} color="secondary" onClick={skipSong}>
      <SkipNextIcon />
    </IconButton>
  );
}

export default SkipSongButton;
