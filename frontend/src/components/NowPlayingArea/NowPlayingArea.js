// react
import React, { useState, useRef, useEffect } from "react";

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
    paddingTop: theme.spacing(1),
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
  const [volume, setVolume] = useState(0.9);
  const [playing, setPlaying] = useState(true);

  const playerRef = useRef(null);

  const nextTitle = getNextInQueue()?.title;
  const previousTitle = getPreviousInQueue()?.title;

  useEffect(() => {
    setPlaying(true);
  }, [nowPlaying]);

  // pauses the video
  function pauseVideo() {
    setPlaying(false);
  }
  // starts the video
  function startVideo() {
    setPlaying(true);
  }

  function changeTime(seconds) {
    playerRef.current.seekTo(seconds);
  }

  // called everytime the video progress changes
  function handleProgress(e) {
    const currentTime = e.playedSeconds;
    const totalTime = nowPlaying.duration.seconds;

    setSongProgress(Math.round(currentTime));

    if (currentTime >= totalTime - 3) {
      skipSong();
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
          playing,
          playerRef,
        }}
      />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item xs={7}></Grid>
          <Grid item xs={4}>
            <VolumeController {...{ volume, setVolume }} />
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={12}>
            <ProgressBar
              {...{ songProgress, changeTime }}
              songDuration={nowPlaying.duration.seconds}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography align="center">{nowPlaying.title}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Toolbar className={classes.grow}>
              {isQueue && (
                <PreviousSongButton disabled={!previousTitle} {...{ previousSong }} />
              )}

              {playing ? (
                <IconButton color="secondary" onClick={pauseVideo}>
                  <PauseIcon />
                </IconButton>
              ) : (
                <IconButton color="secondary" onClick={startVideo}>
                  <PlayArrowIcon />
                </IconButton>
              )}

              {isQueue && <SkipSongButton disabled={!nextTitle} {...{ skipSong }} />}
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
