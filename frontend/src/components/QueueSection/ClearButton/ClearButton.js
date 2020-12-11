import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton, Box } from "@material-ui/core";
// import { clear } from "../../../functions";

function ShareButton({ disabled }) {
  return (
    <Box mt={1}>
      <IconButton
        edge="end"
        title="Clear the entire queue"
        disabled={disabled}
        target="_blank"
        color={disabled ? "inherit" : "secondary"}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default ShareButton;
