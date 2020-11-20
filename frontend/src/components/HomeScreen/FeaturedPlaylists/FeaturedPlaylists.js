import React from "react";
import { Grid, Typography, IconButton, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFeed } from "../../../functions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FeedItem from "./FeedItem/FeedItem";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation"

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
  const [loading, setLoading] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const feed = await getFeed();
      setFeedItems(feed);
      setLoading(false);
    })();
  }, []);
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" color="textSecondary">
        Featured playlists
        <IconButton>
          <MoreVertIcon color="disabled" />
        </IconButton>
      </Typography>

      {loading ? (
        <Grid 
          container 
          justify="center"
          style={{ paddingTop: '30px' }}
          >
          <LoadingAnimation size="300px"/>
        </Grid> 
      ) : (
        <Box mx={2}>
          <Grid container direction="column" spacing={1}>
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
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default FeaturedPlaylists;
