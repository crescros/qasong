import React, { useCallback } from "react";
import { Typography, Box } from "@material-ui/core";
import QueueItem from "./QueueCard/QueueCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";

function QueueSection({ nowPlaying, setNowPlaying, queue, setQueue }) {
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
      {(queue.length > 0 || nowPlaying) && (
        <div>
          <Box m={3}>
            <Typography variant="h5">
              {queue.length > 0 && `${queue.length} songs queued`}
            </Typography>
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
