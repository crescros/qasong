import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Queue as QueueIcon } from "@material-ui/icons";

function AddToQueueButton({ handleAddQueue }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    handleAddQueue(event);
    setAnchorEl(event.currentTarget);
    setTimeout(handleClose, 1250);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const open = Boolean(anchorEl);
  return (
    <Tooltip open={open} onClose={handleClose} title="added to queue">
      <IconButton
        onClick={handleClick}
        className="qasong-addtoqueue"
        style={{ background: "#00000080", color: "white" }}
      >
        <QueueIcon />
      </IconButton>
    </Tooltip>
  );
}

export default AddToQueueButton;
