import React from 'react'
import { Typography, Button } from '@material-ui/core'

function NowPlayingInfo({ title, setNowPlaying }) {

    const handleClickStopButton = () => {
        setNowPlaying()
    }

    return (<>{
        title && <div>
            <Typography style={{ margin: '0 20px' }}>Now Playing: {title}   <Button onClick={handleClickStopButton} variant='outlined' color='secondary'>STOP</Button></Typography>
        </div>
    }
    </>
    )
}

export default NowPlayingInfo
