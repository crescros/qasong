import React from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Tooltip, Box, IconButton } from "@material-ui/core";
import { clear } from "../../../functions";


function ShareButton({ disabled, queue, setQueue, setNowPlaying }) {
  function handleClick() {
        var confirmClear = confirm("Are you sure you want to clear the queue?");
        if(confirmClear){
            setQueue(clear(queue));
            setNowPlaying([]);
        }
  };

  return (
    <>
      <Tooltip title={disabled ? "Search for songs and add them to your queue" : ""}>
        <Box mt={1}>
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
        </Box>
      </Tooltip>
    </>
  );
}

export default ShareButton;
