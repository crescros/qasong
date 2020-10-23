import React from "react";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import { Tooltip, Box, IconButton } from "@material-ui/core";
import { shuffle } from "../../../functions";

function ShareButton({ disabled, queue, setQueue, setNowPlaying }) {
  const handleClick = () => {
    setQueue(shuffle(queue));

    setNowPlaying(queue[0]);
  };

  return (
    <>
      <Tooltip title={disabled ? "Search for songs and add them to your queue" : ""}>
        <Box mt={1}>
          <IconButton
            edge="end"
            title="Shuffle order of songs in queue"
            disabled={disabled}
            onClick={handleClick}
            target="_blank"
            color={disabled ? "inherit" : "secondary"}
          >
            <ShuffleRoundedIcon />
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
}

export default ShareButton;
