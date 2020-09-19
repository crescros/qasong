import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import Video from './components/Video'
import AppBar from './components/AppBar';
import VideoGrid from './components/VideoGrid'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [videos, setVideos] = useState([]);
    const [nowPlaying, setNowPlaying] = useState()

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmitVideoSearch = async (e) => {
        e.preventDefault();
        const response = await getYoutubeIdFromSearch(searchTerm);
        setVideos(response.data);
    }

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <AppBar
                handleSubmitVideoSearch={handleSubmitVideoSearch}
                handleSearchTermInput={handleSearchTermInput}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
            />

            <VideoGrid
                videos={videos}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
            />

            <Video 
                id={nowPlaying && nowPlaying.id} 
                setNowPlaying={setNowPlaying}
            />

        </ThemeProvider>
    );
}

export default App;
