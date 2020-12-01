// react
import React, { useState } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  Grid,
  IconButton,
  Link,
} from "@material-ui/core";

import { PlayArrow as PlayArrowIcon, Pause as PauseIcon } from "@material-ui/icons";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

// qasong components
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import YoutubeIframe from "./YoutubeIframe/YoutubeIframe";
import ProgressBar from "./ProgressBar/ProgressBar";
import VolumeController from "./VolumeController/VolumeController";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
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
  setNowPlaying,
  previousSong,
  skipSong,
  getNextInQueue,
  getPreviousInQueue,
}) {
  const classes = useStyles();
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.1);
  // const [progressSeconds, setProgressSeconds] = useState(0);

  const nextTitle = getNextInQueue()?.title;
  const previousTitle = getPreviousInQueue()?.title;

  // send an event to ytIframe
  function iframeCommand(command, args = "") {
    const ytIframe = document.querySelector("iframe");
    ytIframe.contentWindow.postMessage(
      `{"event":"command","func":"${command}","args":"${args}"}`,
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
  function restartVideo() {
    iframeCommand("stopVideo");
  }

  // called everytime the video progress changes
  function handleProgress(e) {
    const currentTime = e.playedSeconds;
    const totalTime = nowPlaying.duration.seconds;
    const percentProgress = (currentTime / totalTime) * 100;

    setSongProgress(percentProgress);

    if (percentProgress >= 99){
      skipSong()
    }
  }

  if (!nowPlaying || !nowPlaying.title) {
    return <div></div>;
  }

  const isQueue = nextTitle || previousTitle;

  return (
    <React.Fragment>
      <CssBaseline />

      <YoutubeIframe
        {...{
          nowPlaying,
          setNowPlaying,
          handleProgress,
          volume,
        }}
      />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item xs={12}>
            <VolumeController {...{volume, setVolume}} />
          </Grid>
          <Grid item xs={12}>
            <ProgressBar value={songProgress} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography align="center">{nowPlaying.title}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Toolbar className={classes.grow}>
              <IconButton onClick={restartVideo} color="secondary">
                <SettingsBackupRestoreIcon />
              </IconButton>

              {isQueue && (
                <>
                  <PreviousSongButton disabled={!previousTitle} {...{ previousSong }} />
                  <SkipSongButton disabled={!nextTitle} {...{ skipSong }} />
                </>
              )}

              <IconButton color="secondary" onClick={pauseVideo}>
                <PauseIcon />
              </IconButton>

              <IconButton color="secondary" onClick={startVideo}>
                <PlayArrowIcon />
              </IconButton>
            </Toolbar>
          </Grid>

          <Grid item xs={12} sm={4}>
            {nextTitle && (
              <Box pl={3} align="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={skipSong}
                  color="textSecondary"
                >
                  next: {nextTitle}
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}
