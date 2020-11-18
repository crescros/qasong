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
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    height: 75,
    borderTop: "2px solid",
    borderColor: theme.palette.secondary.main,
  },
  grow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function BottomAppBar({
  nowPlaying,
  previousSong,
  skipSong,
  getNextInQueue,
  iframeState,
}) {
  const classes = useStyles();

  const nextTitle = getNextInQueue()?.title;

  // send an event to ytIframe
  function iframeCommand(command, args = "") {
    const ytIframe = document.querySelector("iframe");
    ytIframe.contentWindow.postMessage(
      '{"event":"command","func":"' + command + '","args":"' + args + '"}',
      "*"
    );
  }

  // pauses the video
  function pauseVideo() {
    iframeCommand("pauseVideo");
  }
  // starts the video
  function startVideo() {
    iframeCommand("playVideo");
  }
  // stops the video
  function stopVideo() {
    iframeCommand("stopVideo");
  }

  if (!nowPlaying || !nowPlaying.title) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.grow}>
          <Typography variant="caption">{nowPlaying.title}</Typography>
          <IconButton onClick={stopVideo} color="secondary">
            <StopIcon />
          </IconButton>
          <PreviousSongButton {...{ previousSong }} />

          <SkipSongButton {...{ skipSong }} />

          {iframeState === 1 ? (
            <IconButton color="secondary" onClick={pauseVideo}>
              <PauseIcon />
            </IconButton>
          ) : (
            <IconButton color="secondary" onClick={startVideo}>
              <PlayArrowIcon />
            </IconButton>
          )}

          <Typography color="secondary">00:00/{nowPlaying.duration.timestamp}</Typography>

          {nextTitle && (
            <Typography color="textSecondary" variant="caption">
              next: {nextTitle}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
