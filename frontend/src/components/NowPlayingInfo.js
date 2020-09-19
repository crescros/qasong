import React from 'react'
import {Typography, Button } from '@material-ui/core'

function NowPlayingInfo({title, setNowPlaying}) {

    const handleClick = () => {
        setNowPlaying()
    }

    return (<>
        <Typography style={{margin:'0 20px'}}>Now Playing: {title}</Typography>
        <Button onClick={handleClick} variant='outlined' color='secondary'>STOP</Button>
        </>
    )
}

export default NowPlayingInfo
