import React, { useCallback, useState } from "react";
import { Typography, Box, TextField, Grid, IconButton } from "@material-ui/core";
import QueueItem from "./QueueCard/QueueCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import ShareButton from "./ShareButton/ShareButton"

function QueueSection({
  nowPlaying,
  setNowPlaying,
  queue,
  setQueue,
  queueName,
  setQueueName,
  showQueue,
}) {
  if (!showQueue) {
    return <div></div>;
  }

  const [tempQueueName, setTempQueueName] = useState(queueName);

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
      {(queue.length > 0 || nowPlaying) && (
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
                <ShareButton disabled={queue.length === 0} />
              </Grid>
              <Grid item>
                <PlayQueueButton {...{setNowPlaying, queue}} />
              </Grid>
              <Grid item>
                <ShuffleButton {...{queue, setQueue}} />
              </Grid>
            </Grid>
          </Box>

          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            {queue.map((item, index) => (
              <QueueItem
                {...item}
                key={item.qid}
                queue={queue}
                setQueue={setQueue}
                index={index}
                nowPlaying={nowPlaying}
                onClickImage={handleClickQueueItem}
                moveCard={moveCard}
              />
            ))}
          </DndProvider>
        </div>
      )}
    </>
  );
}

export default QueueSection;
