import React from 'react'
import {  IconButton, TextField } from "@material-ui/core"
import { PlayArrow } from "@material-ui/icons"

function VideoSearch({onSubmit, handleSearchTermInput}) {
    return (
        <form onSubmit={onSubmit}>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearchTermInput} />
            <IconButton><PlayArrow /></IconButton>
        </form>
    )
}

export default VideoSearch
