import React from "react";
import YouTube from "react-youtube";

function Video({ id, setNowPlaying }) {
  const youtubePlayerOptions = {
    height: "100px",
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


  function iframeCommand(command){
    const ytIframe = document.querySelector("iframe")
    ytIframe.contentWindow.postMessage('{"event":"command","func":"' + command + '","args":""}', '*');
  }

  function pauseVideo() {
    iframeCommand("pauseVideo")
  }
  
  function startVideo() {
    iframeCommand("playVideo")
    
  }
  
  function stopVideo() {
    iframeCommand("stopVideo")
  }


  if (!id) return <div id="empty-div"></div>;

  return <>
  <button onClick={stopVideo}>stop</button>
  <button onClick={startVideo}>play</button>
  <button onClick={pauseVideo}>pause</button>
  <br/>
  lol
  <br/>
  lol
  <br/>
  lol
  <br/>
  lol
  <br/>
  <YouTube videoId={id} opts={youtubePlayerOptions} onEnd={handleVideoEnd} /></>;
}

export default Video;
