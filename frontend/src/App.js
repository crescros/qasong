import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import Video from './components/Video'
import VideoSearch from './components/VideoSearch'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [videoId, setVideoId] = useState(undefined)

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmitVideoSearch = async (e) => {
        e.preventDefault()
        const response = await getYoutubeIdFromSearch(searchTerm)
        setVideoId(response.data)
    }

    return (<Container>
        <Typography variant='h1'>Music App</Typography>
        <VideoSearch
            onSubmit={handleSubmitVideoSearch}
            handleSearchTermInput={handleSearchTermInput}
        />
        <Video 
            id={videoId}
        />
    </Container>
    );
}

export default App;
