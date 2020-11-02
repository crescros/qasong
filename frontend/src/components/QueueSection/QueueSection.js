import React, { useCallback, useState } from "react";
import { Typography, Box, TextField, Grid } from "@material-ui/core";
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
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import DisplayModeButton from "./DisplayModeButton/DisplayModeButton";

function QueueSection({
  nowPlaying,
  setNowPlaying,
  queue,
  setQueue,
  queueName,
  showQueue,
  skipSong,
  previousSong
}) {
  if (!showQueue) {
    return <div></div>;
  }

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

  return (
    <>
      {(queue.length > 0) && (
        <div style={{maxWidth: "800px", margin:"0 auto 200px auto"}}>
          <Box m={3}>
            <Grid container alignItems="flex-end" alignItems="center">
              <Grid item>
                <Typography variant="h5">
                  {queue.length > 0 && `${queue.length} songs - ${queueName}`}
                </Typography>
              </Grid>
              <Grid item>
                <PlayQueueButton {...{ setNowPlaying, queue }} />
              </Grid>
              <Grid item>
                <ShuffleButton {...{ queue, setQueue, setNowPlaying }} />
              </Grid>
              <Grid item>
                <PreviousSongButton {...{ previousSong }} />
              </Grid>
              <Grid item>
                <SkipSongButton {...{ skipSong }} />
              </Grid>
              <Grid item>
                <DisplayModeButton {...{ displayMode, setDisplayMode }} />
              </Grid>
              <Grid item>
                <ClearButton {...{ setQueue }} />
              </Grid>
            </Grid>
          </Box>

          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            {displayMode === "list" ?
              <Grid container direction="column">
                {
                  queue.map((item, index) => {
                    return <QueueRow
                      {...item}
                      key={item.qid}
                      queue={queue}
                      setQueue={setQueue}
                      index={index}
                      nowPlaying={nowPlaying}
                      onClickImage={handleClickQueueItem}
                      moveCard={moveCard}
                    />
                  })}
              </Grid>
              :
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

            }
          </DndProvider>
        </div>
      )}
    </>
  );
}

export default QueueSection;
