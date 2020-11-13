import React from "react";
import featuredPlaylists from "./featuredPlaylists.json";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Playlist from "./Playlist/Playlist";
import JoinUsOnDiscord from "./JoinUsOnDiscord/JoinUsOnDiscord";
import HmaksPlaylist from "./HmaksPlaylist/HmaksPlaylist";
import { shuffle } from "../../../functions";
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


const feedItems = shuffle(featuredPlaylists)

function FeaturedPlaylists({
  setQueue,
  setQueueName,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
  addSongToQueue
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" color="textSecondary">
        Featured playlists 
        <IconButton>
          <MoreVertIcon color="textSecondary" />
        </IconButton>
      </Typography>

      {feedItems.map((playlist) => {
        if (playlist.tags && playlist.tags.includes("hmak")) {
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
                addSongToQueue
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
              setQueueName,
              setNowPlaying,
              setShowQueue,
              nowPlaying,
              queue,
              addSongToQueue
            }}
          />
        );
      })}
    </div>
  );
}

export default FeaturedPlaylists;
