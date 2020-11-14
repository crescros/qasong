import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFeed } from "../../../functions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FeedItem from "./FeedItem/FeedItem";

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
  addSongToQueue,
}) {
  const classes = useStyles();
  const [feedItems, setFeedItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const feed = await getFeed();
      setFeedItems(feed);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" color="textSecondary">
        Featured playlists
        <IconButton>
          <MoreVertIcon color="textSecondary" />
        </IconButton>
      </Typography>

      {feedItems.map((playlist) => {
        return (
          <FeedItem
            key={playlist.id}
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
        );
      })}
    </div>
  );
}

export default FeaturedPlaylists;
