import React from 'react'
import { Typography, Button, Grid, Box } from '@material-ui/core'
import QueueItem from './QueueCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import Video from './Video'

function QueueSection({ title, nowPlaying, setNowPlaying, queue, setQueue }) {

    const handleClickStopButton = () => {
        if (title) {
            setNowPlaying()
        } else {
            setNowPlaying(queue[0])
            setQueue(queue.slice(1));
        }
    }

    return (<>{
        (queue.length > 0 || nowPlaying) &&

        <div>
            <Video
                id={nowPlaying && nowPlaying.id}
                setNowPlaying={setNowPlaying}
            />
            <Box m={3} >
                <Typography variant='h5'>
                    {queue.length > 0 && `${queue.length} songs queued`}
                </Typography>
            </Box>

            <DndProvider backend={HTML5Backend}>
                <Grid style={{ overflowX: 'scroll', flexWrap: 'nowrap' }} container direction="row" justify="start" alignItems="flex-start">
                    {queue.map((item, i) => <Grid item md={4}
                        lg={3}
                        xl={2}><QueueItem {...item} onClick={handleClickStopButton} queue={queue} i={i} /></Grid>)}
                </Grid>
            </DndProvider>
        </div>
    }
    </>
    )
}

export default QueueSection
