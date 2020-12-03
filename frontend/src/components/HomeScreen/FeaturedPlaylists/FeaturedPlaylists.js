import React from "react";
import { Grid, Typography, Box, Select, MenuItem, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFeed } from "../../../functions";
import FeedItem from "./FeedItem/FeedItem";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tagSelect: {
    width: "150px",
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
  const [tags, setTag] = React.useState("");

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const feed = await getFeed();
      setFeedItems(feed);
      setLoading(false);
    })();
  }, []);

  const listOfTag = [];
  feedItems.map((playlist) => {
    if (!playlist.tags) return null;

    playlist.tags.map((tag) => {
      if (tag !== "hmak" && tag !== "discord-ad" && !listOfTag.includes(tag))
        listOfTag.push(tag);
    });
  });

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" color="textSecondary">
        Featured playlists
      </Typography>

      {loading ? (
        <Grid container justify="center" style={{ paddingTop: "30px" }}>
          <LoadingAnimation size="300px" />
        </Grid>
      ) : (
        <Box mx={2}>
          <InputLabel id="tag-label">Tag</InputLabel>
          <Select
            className={classes.tagSelect}
            labelId="tag-label"
            id="tag-select"
            value={tags}
            onChange={(e) => setTag(e.target.value)}
          >
            {listOfTag.map((tag, index) => {
              return (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              );
            })}
          </Select>

          <Grid container direction="column" spacing={1}>
            {feedItems.map((playlist) => {
              if (!tags || (playlist.tags && playlist.tags.includes(tags))) {
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
              }
            })}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default FeaturedPlaylists;
