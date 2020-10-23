import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  CardMedia,
  Typography,
} from "@material-ui/core";
import uuid from "react-uuid";
import AddToQueueButton from "./AddToQueueButton/AddToQueueButton";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    minWidth: 250,
    maxHeight: 190,
    boxShadow: "none",
    backgroundColor: "transparent",
    "&:hover > *": {
      visibility: "visible !important",
    },
  },
  media: {
    height: 130,
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  overlay: {
    visibility: "hidden",
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(0.5),
  },
}));

export default function MediaCard({ video, setNowPlaying, nowPlaying, queue, setQueue }) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (nowPlaying && nowPlaying.videoId === video.videoId) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [nowPlaying]);

  function handlePlayButton(event) {
    event.stopPropagation();

    if (!playing) {
      setNowPlaying(video);
      setPlaying(true);
    } else {
      setNowPlaying({});
      setPlaying(false);
    }
  }

  function handleAddQueue(event) {
    event.stopPropagation();
    setQueue(
      queue.concat({
        ...video,
        qid: uuid(),
      })
    );
  }

  return (
    <Card
      className={classes.card}
      style={{ backgroundColor: playing && "#2ad156" }}
      onClick={handlePlayButton}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={video.image} />
        <Box p={1}>
          <Grid container direction="column">
            <Grid item>
              <Typography className={classes.truncate} variant="caption">
                {video.title}
              </Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Grid item>
                <Typography className={classes.truncate} variant="caption">
                  {video.author.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.truncate} variant="caption">
                  {video.timestamp}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>

      <Box className={classes.overlay}>
        <AddToQueueButton {...{ handleAddQueue }} />
      </Box>
    </Card>
  );
}
