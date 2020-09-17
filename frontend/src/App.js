import React, { useState } from "react";
import { Container, IconButton, Typography, TextField } from "@material-ui/core"
import { PlayArrow } from "@material-ui/icons"
import { getYoutubeIdFromSearch } from './functions'
import YouTube from 'react-youtube'


const App = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [videoId, setVideoId] = useState(undefined)


    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await getYoutubeIdFromSearch(searchTerm)
        setVideoId(response.data)
    }

    const youtubePlayerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    return (<Container>
        <Typography variant='h1'>Music App</Typography>
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearchTermInput} />
            <IconButton><PlayArrow /></IconButton>
        </form>
        {
            videoId && <YouTube
                videoId={videoId}
                opts={youtubePlayerOptions}
            />
        }
    </Container>
    );
}

export default App;
