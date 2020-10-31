import React, { useCallback, useState } from "react";
import { Typography, Box, TextField, Grid } from "@material-ui/core";
import QueueCard from "./QueueCard/QueueCard";
import QueueRow from "./QueueRow/QueueRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import ShareButton from "./ShareButton/ShareButton";
import PlayQueueButton from "./PlayQueueButton/PlayQueueButton";
import ShuffleButton from "./ShuffleButton/ShuffleButton";
import ClearQueueButton from "./ClearQueueButton/ClearQueueButton";
import SkipSongButton from "./SkipSongButton/SkipSongButton";
import PreviousSongButton from "./PreviousSongButton/PreviousSongButton";
import DisplayModeButton from "./DisplayModeButton/DisplayModeButton";

function QueueSection({
  nowPlaying,
  setNowPlaying,
  queue,
  setQueue,
  queueName,
  setQueueName,
  showQueue,
  skipSong,
  previousSong
}) {
  if (!showQueue) {
    return <div></div>;
  }

  const [tempQueueName, setTempQueueName] = useState(queueName);
  const [displayMode, setDisplayMode] = useState("list");

  const handleClickQueueItem = (qid) => {
    setNowPlaying(queue.find((item) => item.qid === qid));
  };

  const handleQueueNameChange = (e) => {
    setTempQueueName(e.target.value);
  };

  const handleQueueNameSubmit = (e) => {
    e.preventDefault();
    setQueueName(tempQueueName);
    if (!tempQueueName) {
      setTempQueueName("New Queue");
    }
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

  const editingQueueName = tempQueueName === queueName;

  return (
    <>
      {(queue.length > 0) && (
        <div>
          <Box m={3}>
            <Grid container alignItems="flex-end">
              <Grid item>
                <Typography variant="h5">
                  {queue.length > 0 && `${queue.length} songs - `}
                </Typography>
              </Grid>
              <Grid item>
                <Box ml={2}>
                  <form onSubmit={handleQueueNameSubmit}>
                    <TextField
                      id="queue-name"
                      autoFocus={true}
                      label={`Queue Name${editingQueueName ? "" : "(editing)"}`}
                      defaultValue={tempQueueName}
                      onChange={handleQueueNameChange}
                      // InputProps={{
                      //   readOnly: true,
                      // }}
                      variant={editingQueueName ? "standard" : "filled"}
                    />
                  </form>
                </Box>
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
                <DisplayModeButton {...{ displayMode, setDisplayMode}} />
              </Grid>
              <Grid item>
                <ShareButton disabled={queue.length === 0} />
              </Grid>
              <Grid item>
                <ClearQueueButton {...{ setQueue }} />
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
