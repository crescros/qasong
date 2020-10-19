import React from "react";
import Video from "./Video/Video";
import { isMobile } from "react-device-detect";

function VideoArea({ nowPlaying, setNowPlaying }) {
  if (!(nowPlaying && nowPlaying.id)) {
    return <div id="#empty-div"></div>;
  }

  return (
    <>
      <div
        style={
          isMobile
            ? {
                position: "fixed",
                left: "0",
                right: "0",
                background: "black",
                zIndex: "100",
              }
            : {}
        }
      >
        <Video id={nowPlaying.id} setNowPlaying={setNowPlaying} />
      </div>
      {isMobile && <div style={{ height: "100px" }}></div>}
    </>
  );
}

export default VideoArea;
