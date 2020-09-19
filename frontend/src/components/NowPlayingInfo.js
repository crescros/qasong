import React from 'react'
import { Typography, Button } from '@material-ui/core'

function NowPlayingInfo({ title, setNowPlaying }) {

    const handleClickStopButton = () => {
        setNowPlaying()
    }

    return (<>{
        title && <div>
            <Typography style={{ margin: '0 20px' }}>Now Playing: {title}</Typography>
            <Button onClick={handleClickStopButton} variant='outlined' color='secondary'>STOP</Button>
        </div>
    }
    </>
    )
}

export default NowPlayingInfo
