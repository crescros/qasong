// react
import React, { useState, useRef, useEffect } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Toolbar,
  AppBar,
  Grid,
  IconButton,
  Box,
  //Link,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import Slide from "@material-ui/core/Slide";

// qasong components
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import YoutubeIframe from "./YoutubeIframe/YoutubeIframe";
import ProgressBar from "./ProgressBar/ProgressBar";
import VolumeController from "./VolumeController/VolumeController";
import browser from "browser-detect";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    //borderTop: "2px solid",
    paddingTop: theme.spacing(0),
    //borderColor: theme.palette.secondary.main,
    backdropFilter: `blur(8px) brightness(${
      theme.palette.type === "dark" ? "35%" : "185%"
    })`,
  },
  grow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  firefox: {
    top: "auto",
    bottom: 0,
    //borderTop: "2px solid",
    paddingTop: theme.spacing(0),
    //borderColor: theme.palette.secondary.main,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
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
  const [condensed, setCondensed] = useState(false);

  const playerRef = useRef(null);

  const nextTitle = getNextInQueue()?.title;
  const previousTitle = getPreviousInQueue()?.title;

  useEffect(() => {
    if (nowPlaying && nowPlaying.videoId) {
      setPlaying(true);
    } else {
      setCondensed(false);
      setPlaying(false);
    }
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

  // function handleToggleCondensed() {
  //   setCondensed(!condensed);
  // }

  if (!nowPlaying || !nowPlaying.title) {
    return <div></div>;
  }

  const isQueue = nextTitle || previousTitle;

  return (
    <>
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
      <Slide direction="up" in={Boolean(nowPlaying) && nowPlaying.title}>
        <AppBar
          color="transparent"
          position="fixed"
          className={browser().name === "firefox" ? classes.firefox : classes.appBar}
          id="qasong-playbar"
        >
          <Grid container justify="center" alignItems="center" alignContent="center">
            <Grid item xs={12}>
              <ProgressBar
                {...{ songProgress, changeTime }}
                songDuration={nowPlaying.duration.seconds}
              />
            </Grid>
            {!condensed && (
              <Grid item xs={12} md={1} sm={2}>
                <Box align="center">
                  <img src={nowPlaying.thumbnail} width="69px" height="69px"></img>
                </Box>
              </Grid>
            )}
            <Grid item xs={condensed ? 6 : 12} sm={3} md={4}>
              <Typography variant="body2" align="center">
                {nowPlaying.title}
              </Typography>
              <Typography variant="body2" align="center">
                {nowPlaying.author.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <VolumeController {...{ volume, setVolume }} />
            </Grid>
            <Grid item xs={condensed ? 6 : 12} sm={condensed ? 3 : 2}>
              <Toolbar className={classes.grow}>
                {isQueue && (
                  <PreviousSongButton
                    style={{ fontSize: 25 }}
                    disabled={!previousTitle}
                    {...{ previousSong }}
                  />
                )}

                {playing ? (
                  <IconButton color="secondary" onClick={pauseVideo}>
                    <PauseCircleOutlineIcon style={{ fontSize: 40 }} />
                  </IconButton>
                ) : (
                  <IconButton color="secondary" onClick={startVideo}>
                    <PlayCircleOutlineIcon style={{ fontSize: 40 }} />
                  </IconButton>
                )}

                {isQueue && (
                  <SkipSongButton
                    style={{ fontSize: 25 }}
                    disabled={!nextTitle}
                    {...{ skipSong }}
                  />
                )}
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>
      </Slide>
    </>
  );
}
