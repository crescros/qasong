import React, { useState } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import Video from './components/Video'
import VideoSearch from './components/VideoSearch'
import AppBar from './components/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const App = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ videos, setVideos ] = useState([]);

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
            <AppBar />
                <Grid container>
                <Grid item xs={12}>

                    <VideoSearch onSubmit={handleSubmitVideoSearch} handleSearchTermInput={handleSearchTermInput} />
                </Grid>
                {
                    videos.map(video => {
                        return <Grid item xs={12}>
                            <Typography variant="h6">{video.snippet.title}</Typography>
                            <Typography>{video.snippet.description}</Typography>
                        </Grid>
                    })
                }
            </Grid>
        </ThemeProvider>
    ); 
}

export default App;
