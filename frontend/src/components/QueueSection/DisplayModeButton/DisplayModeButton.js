import React from "react";
import { IconButton, Box } from "@material-ui/core";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import TocIcon from "@material-ui/icons/Toc";

function ShareButton({ disabled, displayMode, setDisplayMode }) {
  function handleClick() {
    if (displayMode === "list") {
      setDisplayMode("grid");
    } else {
      setDisplayMode("list");
    }
  }
  return (
    <Box mt={1}>
      <IconButton
        edge="end"
        title="toggle between list/grid view"
        disabled={disabled}
        onClick={handleClick}
        target="_blank"
        color={disabled ? "inherit" : "secondary"}
      >
        {displayMode === "list" ? <ViewComfyIcon /> : <TocIcon />}
      </IconButton>
    </Box>
  );
}

export default ShareButton;
