import React, { useCallback, useState } from "react";
import { IconButton, Typography, Box, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import QueueCard from "./QueueCard/QueueCard";
import QueueRow from "./QueueRow/QueueRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import PlayQueueButton from "./PlayQueueButton/PlayQueueButton";
import ShuffleButton from "./ShuffleButton/ShuffleButton";
import ClearButton from "./ClearButton/ClearButton";
import DisplayModeButton from "./DisplayModeButton/DisplayModeButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import SaveIcon from "@material-ui/icons/Save";
import { Queue as QueueIcon } from "@material-ui/icons";

function QueueSection({ nowPlaying, setNowPlaying, queue, setQueue }) {
  const [displayMode, setDisplayMode] = useState("list");

  const handleClickQueueItem = (qid) => {
    setNowPlaying(queue.find((item) => item.qid === qid));
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = queue[dragIndex];
      setQueue(
        update(queue, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [queue]
  );

  if (!queue.length > 0) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto 200px auto" }}>
        <Typography align="center">
          <i> No queue exists. </i>
          Click
          <IconButton disabled>
            <QueueIcon />
          </IconButton>
          icon to add song to your queue.
        </Typography>

        <Box m={3}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h5">
                <Skeleton variant="text" width={100} height={50} />
              </Typography>
            </Grid>
            <Grid item>
              <PlayQueueButton disabled />
            </Grid>
            <Grid item>
              <ShuffleButton disabled />
            </Grid>
            <Grid item>
              <DisplayModeButton disabled />
            </Grid>
            <Grid item>
              <ClearButton disabled />
            </Grid>
          </Grid>
        </Box>

        {[1, 2, 3].map((index) => {
          return (
            <Grid container key={index}>
              <Grid item xs={1}>
                <IconButton disabled>
                  <PlayArrowIcon />
                </IconButton>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  <Skeleton variant="text" width={300} height={50} />
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton disabled>
                  <DragHandleIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  <Skeleton variant="text" width={100} height={50} />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto 200px auto" }}>
      <Box m={3}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5">
              {queue.length > 0 && `${queue.length} songs`}
            </Typography>
          </Grid>
          <Grid item>
            <PlayQueueButton {...{ setNowPlaying, queue }} />
          </Grid>
          <Grid item>
            <ShuffleButton {...{ queue, setQueue, setNowPlaying }} />
          </Grid>
          <Grid item>
            <DisplayModeButton {...{ displayMode, setDisplayMode }} />
          </Grid>
          <Grid item>
            <IconButton>
              <SaveIcon size="small" />
            </IconButton>
          </Grid>

          <Grid item>
            <ClearButton {...{ setQueue }} />
          </Grid>
        </Grid>
      </Box>

      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        {displayMode === "list" ? (
          <Grid container direction="column">
            {queue.map((item, index) => {
              return (
                <QueueRow
                  {...item}
                  key={item.qid}
                  queue={queue}
                  setQueue={setQueue}
                  index={index}
                  nowPlaying={nowPlaying}
                  onClickMusicRow={handleClickQueueItem}
                  moveCard={moveCard}
                />
              );
            })}
          </Grid>
        ) : (
          queue.map((item, index) => (
            <QueueCard
              {...item}
              key={item.qid}
              queue={queue}
              setQueue={setQueue}
              index={index}
              nowPlaying={nowPlaying}
              onClickImage={handleClickQueueItem}
              moveCard={moveCard}
            />
          ))
        )}
      </DndProvider>
    </div>
  );
}

export default QueueSection;
