import React, { useState, useEffect } from "react";
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
    const [queue, setQueue] = useState([]);
    const [nowPlaying, setNowPlaying] = useState()

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmitVideoSearch = async (e) => {
        e.preventDefault();
        const response = await getYoutubeIdFromSearch(searchTerm);
        setVideos(response.data);
    }

    useEffect(() => {
        if (!nowPlaying && queue.length > 0) {
            const nextInQueue = queue[0];
            setNowPlaying(nextInQueue);
            setQueue(queue.slice(1));
        }

    }, [nowPlaying]
    )

    const darkTheme = createMuiTheme({
        palette: {
            primary: {
                light: '#241b3d',
                main: '#241b3d',
                dark: '#241b3d',
                contrastText: '#fff',
            },

            secondary: {
                light: '#2ad156',
                main: '#2ad156',
                dark: '#2ad156',
                contrastText: '#fff',
            },

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
                queue={queue}
            />

            <VideoGrid
                videos={videos}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
                queue={queue}
                setQueue={setQueue}
            />

            <Video
                id={nowPlaying && nowPlaying.id}
                setNowPlaying={setNowPlaying}
            />

        </ThemeProvider>
    );
}

export default App;
