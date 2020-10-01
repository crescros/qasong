import { EcoTwoTone } from '@material-ui/icons'
import React from 'react'
import YouTube from 'react-youtube'

function Video({ id, setNowPlaying }) {

    
    const youtubePlayerOptions = {
        height: '100',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            playsinline: 1,
            iv_load_policy: 0,
            modestbranding: 1
        }
    }
    
    function hanndleVideoEEENNNnnd() {
        setNowPlaying(null)
    }
    
    if (!id) return <div></div>

    return (<YouTube
        videoId={id}
        opts={youtubePlayerOptions}
        onEnd={hanndleVideoEEENNNnnd}
    />
    )
}

export default Video
