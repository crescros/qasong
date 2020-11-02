import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipNextIcon from '@material-ui/icons/SkipNext';


function SkipSongButton({ skipSong }) {
    return (
        <IconButton
            color="secondary"
            onClick={skipSong}>
            <SkipNextIcon
            />
        </IconButton>
    )
}

export default SkipSongButton
