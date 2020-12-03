import React from "react";
import Playlist from "../../../PlaylistSection/Playlist/Playlist";
import JoinUsOnDiscord from "./JoinUsOnDiscord/JoinUsOnDiscord";
import HmaksPlaylist from "./HmaksPlaylist/HmaksPlaylist";

function FeedItem({
  playlist,
  setQueue,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
  addSongToQueue,
}) {
  if (playlist.tags && playlist.tags.includes("hmak")) {
    return (
      <HmaksPlaylist
        key={playlist.id}
        {...{
          playlist,
          setQueue,
          setNowPlaying,
          setShowQueue,
          nowPlaying,
          queue,
          addSongToQueue,
        }}
      />
    );
  }

  if (playlist.tags && playlist.tags.includes("discord-ad")) {
    return <JoinUsOnDiscord />;
  }

  // default
  return (
    <Playlist
      key={playlist.id}
      {...{
        playlist,
        setQueue,
        setNowPlaying,
        setShowQueue,
        nowPlaying,
        queue,
        addSongToQueue,
      }}
    />
  );
}

export default FeedItem;
