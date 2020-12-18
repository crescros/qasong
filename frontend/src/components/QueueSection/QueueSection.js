// react
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import Alert from "@material-ui/lab/Alert";

// material-ui
import { IconButton, Typography, Box, Grid } from "@material-ui/core";

import {
  Queue as QueueIcon,
  DragHandle as DragHandleIcon,
  PlayArrow as PlayArrowIcon,
} from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";

// qasong components
import DisplayModeButton from "./DisplayModeButton/DisplayModeButton";
import QueueCard from "./QueueCard/QueueCard";
import QueueRow from "./QueueRow/QueueRow";
import PlayQueueButton from "./PlayQueueButton/PlayQueueButton";
import ShuffleButton from "./ShuffleButton/ShuffleButton";
import ClearButton from "./ClearButton/ClearButton";
import SaveQueueButton from "./SaveQueueButton/SaveQueueButton";
import ConfirmClearDialog from "./ConfirmClearDialog/ConfirmClearDialog";

function QueueSection({ nowPlaying, setNowPlaying, queue, setQueue }) {
  const [displayMode, setDisplayMode] = useState("list");
  const [displaySaved, setDisplaySaved] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleClickQueueItem = (qid) => {
    setNowPlaying(queue.find((item) => item.qid === qid));
  };

  const handleClickSave = () => {
    setDisplaySaved(true);
    setTimeout(() => {
      setDisplaySaved(false);
    }, 3000);
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
              <SaveQueueButton disabled />
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
        <Grid container alignItems="center" spacing={1}>
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
          <Grid item onClick={handleClickSave}>
            <SaveQueueButton {...{ queue }} />
          </Grid>
          <Grid
            item
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure you want to clear the queue?",
                subTitle: "You can't undo this operation.",
              });
            }}
          >
            <ClearButton {...{ setQueue }} />
          </Grid>
          {displaySaved ? (
            <Grid item md={5} xs={12} spacing={3}>
              <Alert severity="success" color="warning" variant="outlined">
                <i>Queue Has Been Successfully Saved</i>
              </Alert>
            </Grid>
          ) : null}
        </Grid>
        <ConfirmClearDialog
          setQueue={setQueue}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
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
