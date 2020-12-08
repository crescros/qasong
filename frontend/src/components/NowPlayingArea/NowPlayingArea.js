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
import {  Pause as PauseIcon } from "@material-ui/icons";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

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
    backgroundColor: theme.palette.background.default,
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
  playbackRate,
}) {
  const classes = useStyles();

  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [playing, setPlaying] = useState(false);

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
          playbackRate,
        }}
      />

      <AppBar position="fixed" className={classes.appBar}>
        <Grid container justify="center" alignItems="center" alignContent="center">

          <Grid item xs={12} sm={4}>
            <Typography align="center">{nowPlaying.title}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Toolbar className={classes.grow}>
              {isQueue && (
                <PreviousSongButton style={{fontSize : 25 }} disabled={!previousTitle} {...{ previousSong }} />
              )}

              {playing ? (
                <IconButton color="secondary" onClick={pauseVideo}>
                  <PauseCircleOutlineIcon style={{fontSize : 40}} />
                </IconButton>
              ) : (
                <IconButton color="secondary" onClick={startVideo}>
                  <PlayCircleOutlineIcon style={{fontSize : 40}}/>
                </IconButton>
              )}

              {isQueue && <SkipSongButton style={{fontSize : 25 }}  disabled={!nextTitle} {...{ skipSong }} />}

              
            </Toolbar>
            <ProgressBar
              {...{ songProgress, changeTime }}
              songDuration={nowPlaying.duration.seconds}
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            {nextTitle && (
              <Box pl={3} align="center">
                <VolumeController {...{ volume, setVolume }} />
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
