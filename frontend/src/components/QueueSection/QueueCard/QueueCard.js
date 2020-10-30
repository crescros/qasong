import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Card,
  Grid,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import { formatVideoTitle } from "../../../functions";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "move",
    display: "inline-block",
    width: "100px",
    position: "relative",
    marginLeft: "41.5px",
    marginTop: "25px",
    backgroundColor: "transparent",
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
  media: {
    height: 70,
  }
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
        backgroundColor: (nowPlaying && nowPlaying.qid) === qid && "#FE9021",
        opacity,
      }}
    >
      <CardActionArea style={{ height: "100px" }} onClick={() => onClickImage(qid)}>
        <CardMedia className={classes.media}
          component="img"
          alt={title}
          image={thumbnail}
          title={title}
        />
        <Box p={1}>
          <Grid container direction="column">
            <Grid item>
              <Typography style={{ fontSize: "8px"}} gutterBottom>
                {formatVideoTitle(title)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
      {/* Remove from queue overlay */}
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
