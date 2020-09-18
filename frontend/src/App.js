import React, { useState } from "react";
import { Typography, Grid, CssBaseline, Container } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import Video from './components/Video'
import VideoSearch from './components/VideoSearch'
import AppBar from './components/AppBar';
import VideoCard from './components/videoCard'
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

            {JSON.stringify(nowPlaying)}
            
            <AppBar />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <VideoSearch onSubmit={handleSubmitVideoSearch} handleSearchTermInput={handleSearchTermInput} />
                </Grid>
                <Container>
                {
                    nowPlaying ?
                        <VideoCard
                            id={nowPlaying.id}
                            title={nowPlaying.title}
                            thumbnailUrl={nowPlaying.thumbnailUrl}
                        /> : videos.map(video => {
                        const url = video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url
                        const title = video.snippet.title

                        return <Grid item xs={12}>
                            <VideoCard
                                id={video.id.videoId}
                                thumbnailUrl={url}
                                title={title}
                                description={video.snippet.description}
                                setNowPlaying={setNowPlaying}
                            />
                        </Grid>
                    })
                }
                </Container>
            </Grid>
            
            {
                nowPlaying && <Video id={nowPlaying.id} />
            }
        </ThemeProvider>
    ); 
}

export default App;
