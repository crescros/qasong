import React from "react";
import ReplyIcon from "@material-ui/icons/Reply";
import { makeStyles } from "@material-ui/core/styles";
import { copyCurrentURL } from "../../../functions";
import { Tooltip, Box, IconButton, Typography, Popover } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function ShareButton({ disabled }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    copyCurrentURL(event);
    setAnchorEl(event.currentTarget);
    setTimeout(handleClose, 2500);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Tooltip title={disabled ? "Search for songs and add them to your queue" : ""}>
        <Box mt={1}>
          <IconButton
            edge="end"
            title="Copy Link to Current Queue"
            disabled={disabled}
            onClick={handleClick}
            target="_blank"
            color={disabled ? "inherit" : "secondary"}
            aria-describedby={id}
          >
            <ReplyIcon />
          </IconButton>
        </Box>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>Link to playlist copied!</Typography>
      </Popover>
    </>
  );
}

export default ShareButton;
