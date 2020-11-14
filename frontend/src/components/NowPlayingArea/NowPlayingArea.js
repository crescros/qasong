import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import StopIcon from "@material-ui/icons/Stop";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 100,
    height: 75,
    borderTop: "2px solid",
    borderColor: theme.palette.secondary.main,
  },
  grow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playSize: {
    fontSize: 12,
  },
}));

export default function BottomAppBar({
  nowPlaying,
  setNowPlaying,
  previousSong,
  skipSong,
}) {
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
          <IconButton onClick={stopTheSong} color="secondary">
            <StopIcon />
          </IconButton>
          <PreviousSongButton {...{ previousSong }} />

          <SkipSongButton {...{ skipSong }} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
