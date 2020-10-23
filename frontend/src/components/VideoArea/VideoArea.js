import React from "react";
import Video from "./Video/Video";
import { isMobile } from "react-device-detect";

const mobileStyles = {
  position: "fixed",
  left: "0",
  right: "0",
  background: "black",
  zIndex: "100",
};

const desktopStyles = {};

function VideoArea({ nowPlaying, setNowPlaying }) {
  if (!(nowPlaying && nowPlaying.videoId)) {
    return <div id="#empty-div"></div>;
  }

  return (
    <>
      <div style={isMobile ? mobileStyles : desktopStyles}>
        <Video id={nowPlaying.videoId} setNowPlaying={setNowPlaying} />
      </div>
      {isMobile && <div style={{ height: "100px" }}></div>}
    </>
  );
}

export default VideoArea;
