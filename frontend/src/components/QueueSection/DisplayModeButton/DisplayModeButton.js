import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import TocIcon from "@material-ui/icons/Toc";

function ClearQueueButton({ disabled, displayMode, setDisplayMode }) {
  function handleClick() {
    if (displayMode === "list") {
      setDisplayMode("grid");
    } else {
      setDisplayMode("list");
    }
  }
  return (
    <IconButton
      edge="end"
      title="toggle between list/grid view"
      disabled={disabled}
      onClick={handleClick}
      target="_blank"
      color="secondary"
    >
      {displayMode === "list" ? <ViewComfyIcon /> : <TocIcon />}
    </IconButton>
  );
}

export default ClearQueueButton;
