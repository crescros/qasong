import React from "react";
import ReactPlayer from "react-player";

export default function Video({
  nowPlaying,
  handleProgress,
  volume,
  playing,
  playerRef,
}) {
  const id = nowPlaying.videoId;
  if (!id) return <div id="empty-div"></div>;

  return (
    <ReactPlayer
      ref={playerRef}
      width="100%"
      height="0px"
      url={"https://www.youtube.com/watch?v=" + id}
      // pip={pip}
      playing={playing}
      controls={false}
      // light={light}
      // loop={loop}
      // playbackRate={playbackRate}
      volume={volume}
      // muted={muted}
      onProgress={handleProgress}
      config={{
        youtube: {
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            playsinline: 1,
            iv_load_policy: 3,
            color: "white",
            enablejsapi: 1,
            origin:
              process.env.NODE_ENV === "production"
                ? "https://qasong.com/"
                : "http://localhost:8080",
          },
        },
      }}
    />
  );
}
