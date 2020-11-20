import React, { useState } from "react";
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
import YouTube from "react-youtube";


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

function Video({ nowPlaying, setNowPlaying, setIframeState }) {
  const youtubePlayerOptions = {
    height: "0px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      playsinline: 1,
      iv_load_policy: 3,
      color: "white",
      enablejsapi: 1,
      origin:
        process.env.NODE_ENV === "production"
          ? "https://artistify-2.appspot.com/"
          : "http://localhost:8080",
    },
  };

  function handleVideoEnd() {
    setNowPlaying(null);
  }

  function handleStateChange(e) {
    setIframeState(e.data);
  }

  const id = nowPlaying.videoId

  if (!id) return <div id="empty-div"></div>;

  return (
    <YouTube
      videoId={id}
      opts={youtubePlayerOptions}
      onEnd={handleVideoEnd}
      // onError
      // onReady
      // onPause
      // onPlay
      // onPlaybackQualityChange
      // onPlaybackRateChange
      onStateChange={handleStateChange}
    />
  );
}
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



  return (
    <React.Fragment>
      <CssBaseline />
      <Video
          {...{
            nowPlaying,
            setNowPlaying,
            iframeState,
            setIframeState,
          }}
        />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.grow}>
          <Typography variant="caption">{nowPlaying.title}</Typography>
          <IconButton onClick={stopVideo} color="secondary">
            <StopIcon />
          </IconButton>
          <PreviousSongButton disabled={!previousTitle} {...{ previousSong }} />

          <SkipSongButton disabled={!nextTitle} {...{ skipSong }} />

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
