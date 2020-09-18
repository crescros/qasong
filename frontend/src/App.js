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
    const [ videoId, setVideoId ] = useState(undefined);

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmitVideoSearch = async (e) => {
        e.preventDefault();
        const response = await getYoutubeIdFromSearch(searchTerm);
        setVideoId(response.data);
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
                    <Grid item xs = { 12 }>
                        <VideoSearch onSubmit = { handleSubmitVideoSearch } handleSearchTermInput = { handleSearchTermInput } />
                    </Grid>    
                    <Grid item xs = { 12 }>
                        <Video id = { videoId } />                
                    </Grid>
                </Grid>
        </ThemeProvider>
    ); 
}

export default App;
