import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Tooltip, IconButton } from "@material-ui/core";
import { clear } from "../../../functions";

function ShareButton({ disabled, queue, setQueue }) {
  function handleClick() {
    let confirmClear = confirm("Are you sure you want to clear the queue?");
    if (confirmClear) {
      setQueue(clear(queue));
    }
  }

  return (
    <Tooltip title={disabled ? "Search for songs and add them to your queue" : ""}>
      <IconButton
        edge="end"
        title="Clear the entire queue"
        disabled={disabled}
        onClick={handleClick}
        target="_blank"
        color={disabled ? "inherit" : "secondary"}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Tooltip>
  );
}

export default ShareButton;
