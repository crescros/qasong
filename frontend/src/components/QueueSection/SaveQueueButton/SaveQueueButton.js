import React from "react";
import uuid from "react-uuid";
import SaveIcon from "@material-ui/icons/Save";
import { IconButton, Box } from "@material-ui/core";
import { addPlaylist } from "../../../functions";

function ShareButton({ disabled, queue }) {
  function handleClick() {
    addPlaylist({
      id: uuid(),
      name: "new playlist",
      queue: queue,
      image: queue[0].image,
    });
  }

  return (
    <Box mt={1}>
      <IconButton
        edge="end"
        title="Save the current queue music"
        disabled={disabled}
        onClick={handleClick}
        target="_blank"
        color={disabled ? "inherit" : "secondary"}
      >
        <SaveIcon />
      </IconButton>
    </Box>
  );
}

export default ShareButton;
