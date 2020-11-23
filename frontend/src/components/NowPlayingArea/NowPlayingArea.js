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
import {
  Stop as StopIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@material-ui/icons";

// components
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import YoutubeIframe from "./YoutubeIframe/YoutubeIframe";
import ProgressText from "./ProgressText/ProgressText";

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
  const [iframeState, setIframeState] = useState();
  // const [progressSeconds, setProgressSeconds] = useState(0);

  const nextTitle = getNextInQueue()?.title;
  const previousTitle = getPreviousInQueue()?.title;

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

  const isStopped = iframeState === -1;
  const isPlaying = iframeState === 1;
  const isQueue = nextTitle || previousTitle

  return (
    <React.Fragment>
      <CssBaseline />
      <YoutubeIframe
        {...{
          nowPlaying,
          setNowPlaying,
          iframeState,
          setIframeState,
        }}
      />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item xs={12} sm={4}>
            <Typography align="center">{nowPlaying.title}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Toolbar className={classes.grow}>
              <IconButton onClick={stopVideo} color="secondary">
                <StopIcon />
              </IconButton>

              {isQueue && <>
                <PreviousSongButton disabled={!previousTitle} {...{ previousSong }} />
                <SkipSongButton disabled={!nextTitle} {...{ skipSong }} />
              </>}

              {isPlaying ? (
                <IconButton color="secondary" onClick={pauseVideo}>
                  <PauseIcon />
                </IconButton>
              ) : (
                  <IconButton color="secondary" onClick={startVideo}>
                    <PlayArrowIcon />
                  </IconButton>
                )}

              <ProgressText
                isActive={isPlaying}
                isReset={isStopped}
                total={nowPlaying.duration.timestamp}
              />
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
