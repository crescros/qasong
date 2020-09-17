import React from 'react'
import YouTube from 'react-youtube'

function Video({ id }) {

    const youtubePlayerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    return (<>
        {
            id && <YouTube
                videoId={id}
                opts={youtubePlayerOptions}
            />
        }
    </>
    )
}

export default Video
