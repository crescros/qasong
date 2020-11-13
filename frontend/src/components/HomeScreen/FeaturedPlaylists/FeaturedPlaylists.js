import React from "react";
import featuredPlaylists from "./featuredPlaylists.json";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Playlist from "./Playlist/Playlist";
import HmaksPlaylist from "./HmaksPlaylist/HmaksPlaylist";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function FeaturedPlaylists({
  setQueue,
  setQueueName,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" style={{ color: "#888" }}>
        Featured playlists
      </Typography>

      {featuredPlaylists.map((playlist) => {


        if (playlist.tags && playlist.tags.includes("hmak")){
          return (
            <HmaksPlaylist
            key={playlist.id}
            {...{
              playlist,
              setQueue,
              setQueueName,
              setNowPlaying,
              setShowQueue,
              nowPlaying,
              queue,
            }}
          />
          )
        }

        // default 
        return (
          <Playlist
            key={playlist.id}
            {...{
              playlist,
              setQueue,
              setQueueName,
              setNowPlaying,
              setShowQueue,
              nowPlaying,
              queue,
            }}
          />
        );
      })}
    </div>
  );
}

export default FeaturedPlaylists;
