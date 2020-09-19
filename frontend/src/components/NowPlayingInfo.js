import React from 'react'
import { Typography, Button } from '@material-ui/core'

function NowPlayingInfo({ title, setNowPlaying, queue }) {

    const handleClickStopButton = () => {
        setNowPlaying()
    }

    return (<>{
        title && <div>
            <Typography style={{ margin: '0 20px' }}>Now Playing: {title}   <Button onClick={handleClickStopButton} variant='outlined' color='secondary'>{
                queue.length > 0 ? "SKIP" : "STOP"
            }</Button></Typography>
            <Typography>
                {queue.length > 0 && `${queue.length} songs queued`}
            </Typography>
        </div>
    }
    </>
    )
}

export default NowPlayingInfo
