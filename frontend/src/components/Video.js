import React from 'react'
import YouTube from 'react-youtube'

function Video({ id, setNowPlaying }) {

    const youtubePlayerOptions = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    
    function hanndleVideoEEENNNnnd() {
        setNowPlaying(null)
    }

    return (<div>
        {
            id && <YouTube
                videoId={id}
                opts={youtubePlayerOptions}
                onEnd={hanndleVideoEEENNNnnd}
           />
        }
    </div>
    )
}

export default Video
