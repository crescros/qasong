import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import { formatVideoTitle } from "../../../functions";
import ClearIcon from "@material-ui/icons/Clear";

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "move",
    display: "inline-block",
    width: "150px",
    position: "relative",
    marginLeft: "41.5px",
    marginTop: "25px",
    "&:hover > *": {
      visibility: "visible !important",
    },
  },
  overlay: {
    visibility: "hidden",
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(0.5),
  },
  buttonUp: {
    visibility: "hidden",
    position: "absolute",
    bottom: theme.spacing(0),
    backgroundColor: "rgba(60,60,60,0.9)",
  },
  buttonDown: {
    visibility: "hidden",
    position: "absolute",
    bottom: theme.spacing(0),
    right: theme.spacing(0),
    backgroundColor: "rgba(60,60,60,0.9)",
  },
  cardButton: {
    width: "40px",
    height: "30px",
  },
}));

export default function ImgMediaCard({
  id,
  index,
  nowPlaying,
  onClickImage,
  moveCard,
  qid,
  queue,
  setQueue,
  thumbnail,
  title,
  moveCardButton,
}) {
  const classes = useStyles();

  const ref = useRef(null);

  const removeQueueItem = () => {
    setQueue(
      queue.filter((item) => {
        return item.qid !== qid;
      })
    );
  };

  const moveQueueItem = (cardIndex, direction) => {
    // Determine the direction of which to move the queue within the queue list's range
    if(direction == "up" && cardIndex > 0){
      moveCardButton(cardIndex, -1);
    }
    else if(direction == "down" && cardIndex < queue.length){
      moveCardButton(cardIndex, 1);
    }
    // Function will not do anything if the current card will be out of bounds
  };

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Card
      ref={ref}
      className={classes.card}
      style={{
        backgroundColor: (nowPlaying && nowPlaying.qid) === qid && "#2ad156",
        opacity,
      }}
    >
      <CardActionArea style={{ height: "100px" }} onClick={() => onClickImage(qid)}>
        <CardMedia
          component="img"
          alt={title}
          height="70"
          image={thumbnail}
          title={title}
        />
        <CardContent style={{ height: "40px" }}>
          <Typography style={{ fontSize: "9px" }} gutterBottom>
            {formatVideoTitle(title)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box className={classes.buttonUp} backgroundColor="primary">
      <Tooltip title="move up in queue">
          <IconButton value="up" className={classes.cardButton}
              edge="start"
              color="secondary"
              onClick={() => moveQueueItem(index, "up")}
              size="small"
              style={{background: "none" }}
            >
            <ArrowLeftIcon />
          </IconButton>
      </Tooltip>
      </Box>
      <Box className={classes.buttonDown}>
      <Tooltip title="move down in queue">
          <IconButton className={classes.cardButton}
              edge="start"
              color="secondary"
              onClick={() => moveQueueItem(index, "down")}
              size="small"
              style={{background: "none"}}
            >
            <ArrowRightIcon />
          </IconButton>
      </Tooltip>
      </Box>


      <Box className={classes.overlay}>
        <Tooltip title="remove from queue">
          <IconButton
            edge="end"
            color="secondary"
            onClick={removeQueueItem}
            size="small"
            style={{ color: "red", background: "#00000080" }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
