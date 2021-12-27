import React from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
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
  const [loading, setLoading] = React.useState(true);
  const [tags] = React.useState("No Tag");
  const [page, setPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState(2);

  //set up scroll listener for bottom of the page
  // React.useEffect(() => {
  //   document.addEventListener("scroll", function () {
  //     if (window.scrollY + window.innerHeight > document.body.scrollHeight) {
  //       setPage(nextPage);
  //     }
  //   });
  // }, []);

  //when user changes page
  React.useEffect(() => {
    (async () => {
      setLoading(true);

      const feed = await getFeed(page);

      setFeedItems(feedItems.concat(feed.results));
      setNextPage(feed.nextPage);
      setLoading(false);
    })();
  }, [page]);

  const handleLoadMore = () => {
    setPage(nextPage);
  };

  // filter feed items
  // const listOfTag = [];
  // feedItems.map((playlist) => {
  //   if (!playlist.tags) return null;

  //   playlist.tags.map((tag) => {
  //     if (tag !== "hmak" && tag !== "discord-ad" && !listOfTag.includes(tag))
  //       listOfTag.push(tag);
  //   });
  // });

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" color="textSecondary">
        Featured playlists
      </Typography>
      <Box mx={2}>
        {/* <InputLabel id="tag-label">Tag</InputLabel>
          <Select
            className={classes.tagSelect}
            labelId="tag-label"
            id="tag-select"
            value={tags}
            onChange={(e) => setTag(e.target.value)}
          >
            <MenuItem value="No Tag">No Tag</MenuItem>
            {listOfTag.map((tag, index) => {
              return (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              );
            })}
          </Select> */}

        <Grid container direction="column" spacing={1}>
          {feedItems.map((playlist) => {
            if (tags === "No Tag" || (playlist.tags && playlist.tags.includes(tags))) {
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
        {loading ? (
          <Grid container justifyContent="center" style={{ paddingTop: "30px" }}>
            <LoadingAnimation size="300px" />
          </Grid>
        ) : (
          <Box align="center">
            <Button onClick={handleLoadMore}>load more playlists</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default FeaturedPlaylists;
