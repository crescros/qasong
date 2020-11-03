import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function ClearQueueButton({ setQueue }) {

    function handleClick() {
        setQueue([])
    }
    return (
        <IconButton
            edge="end"
            title="Remove all songs from the Queue"
            onClick={handleClick}
            target="_blank"
            color="secondary"
        >
            <DeleteIcon />
        </IconButton>
    )
}

export default ClearQueueButton
