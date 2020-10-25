import React from "react";
import { Tooltip, Box, IconButton, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function DesktopMenu({ queue, showQueue, darkMode, setDarkMode, setShowQueue }) {
  const classes = useStyles();
  return (
    <div className={classes.sectionDesktop} id="desktop-menu">
      <Tooltip
        title={queue.length === 0 ? "Search for songs and add them to your queue" : ""}
      >
        <Box>
          <IconButton
            disabled={queue.length === 0}
            edge="end"
            title={showQueue ? "hide queue" : "show queue"}
            color={showQueue ? "secondary" : "inherit"}
            onClick={() => setShowQueue(!showQueue)}
            target="_blank"
          >
            <Badge badgeContent={queue.length} color="secondary">
              <QueueMusicIcon style={{ fontSize: "40px" }} />
            </Badge>
          </IconButton>
        </Box>
      </Tooltip>

      <IconButton
        edge="end"
        title="toggle light/dark theme"
        onClick={() => setDarkMode(!darkMode)}
        target="_blank"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

export default DesktopMenu;
