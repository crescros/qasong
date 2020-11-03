import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';


function SkipSongButton({ previousSong }) {
    return (
        <IconButton
            color="secondary"
            onClick={previousSong}>
            <SkipPreviousIcon
            />
        </IconButton>
    )
}

export default SkipSongButton
