import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import OffIcon from "@material-ui/icons/HighlightOffOutlined";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    height: 75,
    borderTop: "2px solid #FE9021", 
  },
  grow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playSize: {
    fontSize: 12,
  },
});

export default function BottomAppBar({ nowPlaying, setNowPlaying }) {
  const classes = useStyles();

  function stopTheSong() {
    setNowPlaying({});
  }

  if (!nowPlaying || !nowPlaying.title) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.grow}>
          <Typography className={classes.playSize}>{nowPlaying.title}</Typography>
          <IconButton onClick={stopTheSong}>
            <OffIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
