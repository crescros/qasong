import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, TableRow, TableCell, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import uuid from "react-uuid";
import AddToQueueButton from "./AddToQueueButton/AddToQueueButton";

const useStyles = makeStyles({
  row: {
    backgroundColor: "transparent",
    "&:hover > *": {
      backgroundColor: "visible !important",
    },
  },
  media: {
    height: 65,
    width: 115,
  },
});

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
    <TableRow
      className={classes.row}
      key={video.videoId}
      style={{ backgroundColor: playing && "#2ad156" }}
    >
      <TableCell>
        <IconButton onClick={handlePlayButton} aria-label="Play">
          <PlayArrowIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <AddToQueueButton {...{ handleAddQueue }} />
      </TableCell>
      <TableCell>{video.title}</TableCell>
      <TableCell>{video.author.name}</TableCell>
      <TableCell>{video.views}</TableCell>
      <TableCell>
        <CardMedia
          onClick={handlePlayButton}
          className={classes.media}
          image={video.thumbnail}
        />
      </TableCell>
    </TableRow>
  );
}
