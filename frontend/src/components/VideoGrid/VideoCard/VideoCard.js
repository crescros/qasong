import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,
  Button, 
  Card,
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  IconButton, 
  Typography, 
} from '@material-ui/core';
import uuid from "react-uuid";
import { formatVideoTitle } from "../../../functions";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Queue as QueueIcon,
  Info as InfoIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    maxWidth: 250,
    maxHeight: 190,
    boxShadow: 'none',
    backgroundColor: "transparent",
    "&:hover > *": {
      visibility: "visible !important",
    }
  },
  media: {
    height: 130,
  },
  titleSize: {
    fontSize: 11.5,
  },
  overlay: {
    visibility: "hidden",
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(0.5),
    background: "#00000080",
    color: "white"
  },
}));


export default function MediaCard({
  title,
  description,
  thumbnailUrl,
  smallThumbnailUrl,
  id,
  setNowPlaying,
  nowPlaying,
  queue,
  setQueue,
}) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {

    if (nowPlaying && nowPlaying.id === id) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [nowPlaying]);

  function handlePlayButton(event) {

    event.stopPropagation()

    if (!playing) {
      setNowPlaying({
        title: title,
        description: description,
        id: id,
        thumbnailUrl: thumbnailUrl,
      });
      setPlaying(true);
    } else {
      setNowPlaying({});
      setPlaying(false);
    }
  }


  function handleAddQueue(event) {
    event.stopPropagation()
    setQueue(
      queue.concat({
        title: title,
        description: description,
        id: id,
        qid: uuid(),
        thumbnailUrl: thumbnailUrl,
        smallThumbnailUrl: smallThumbnailUrl,
      })
    );
  }

  return (
    <Card className={classes.card} style={{ backgroundColor: playing && "#2ad156" }} onClick={handlePlayButton} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={thumbnailUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.titleSize} gutterBottom variant="h5" component="h2">
            {formatVideoTitle(title)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <IconButton className={classes.overlay} onClick={handleAddQueue}>
        <QueueIcon />
      </IconButton>

    </Card>
  );
}

