import React, { useState } from "react";
import { Grid, CssBaseline, Container } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import Video from './components/Video'
import AppBar from './components/AppBar';
import VideoCard from './components/VideoCard'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const App = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
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

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {
                    videos.map(video => {
                        const url = video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url
                        const title = video.snippet.title

                        return <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <VideoCard
                                id={video.id.videoId}
                                thumbnailUrl={url}
                                title={title}
                                description={video.snippet.description}
                                nowPlaying={nowPlaying}
                                setNowPlaying={setNowPlaying}
                            />
                        </Grid>

                            
                    })
                }
            </Grid>
            
            {
                nowPlaying && <Video id={nowPlaying.id} setNowPlaying = { setNowPlaying }/>
            }
        </ThemeProvider>
    ); 
}

export default App;
