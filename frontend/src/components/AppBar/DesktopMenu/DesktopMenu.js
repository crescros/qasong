import React from "react";
import { Box, IconButton, Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function DesktopMenu({ queueLength, darkMode, setDarkMode }) {
  let history = useHistory();

  const classes = useStyles();

  function handleQueueButtonClick() {
    history.push("/queue");
  }

  function handleDarkModeButtonClick() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={classes.sectionDesktop} id="desktop-menu">
      <Box mr={3}>
        <IconButton
          edge="end"
          title="view songs currently in the queue"
          color="inherit"
          onClick={handleQueueButtonClick}
        >
          <Box mb={1}>
            <Typography>queue</Typography>
          </Box>
          <Badge badgeContent={queueLength} color="secondary">
            <QueueMusicIcon />
          </Badge>
        </IconButton>
      </Box>

      <IconButton
        edge="end"
        title="toggle light/dark theme"
        onClick={handleDarkModeButtonClick}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

export default DesktopMenu;
