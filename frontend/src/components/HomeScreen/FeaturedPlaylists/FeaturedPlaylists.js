import React from "react";
import featuredPlaylists from "./featuredPlaylists.json";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { shuffle } from "../../../functions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FeedItem from "./FeedItem/FeedItem"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const feedItems = shuffle(featuredPlaylists);

function FeaturedPlaylists({
  setQueue,
  setQueueName,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
  addSongToQueue,
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
        return <FeedItem
          {...{
            playlist,
            setQueue,
            setQueueName,
            setNowPlaying,
            setShowQueue,
            nowPlaying,
            queue,
            addSongToQueue,
          }}
        />
      })}
    </div>
  );
}

export default FeaturedPlaylists;
