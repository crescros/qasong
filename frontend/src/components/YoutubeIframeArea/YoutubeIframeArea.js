import React from "react";
import YoutubeIframe from "./YoutubeIframe/YoutubeIframe";

const styles = {
  position: "fixed",
  left: "0",
  right: "0",
  bottom: "0",
  background: "black",
  zIndex: "100",
};

function YoutubeIframeArea({ nowPlaying, setNowPlaying, iframeState, setIframeState }) {
  if (!(nowPlaying && nowPlaying.videoId)) {
    return <div id="#empty-div"></div>;
  }

  return (
    <div style={styles}>
      <YoutubeIframe
        id={nowPlaying.videoId}
        {...{ setNowPlaying, iframeState, setIframeState }}
      />
    </div>
  );
}

export default YoutubeIframeArea;
