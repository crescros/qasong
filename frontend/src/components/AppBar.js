import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NowPlayingInfo from './NowPlayingInfo'
import VideoSearch from './VideoSearch'

export default function ButtonAppBar({ handleSubmitVideoSearch, handleSearchTermInput, nowPlaying, setNowPlaying }) {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography style={{ marginRight: '20px' }}>Music App</Typography>
                <VideoSearch handleSearchTermInput={handleSearchTermInput} handleSubmitVideoSearch={handleSubmitVideoSearch} />
                <NowPlayingInfo title={nowPlaying && nowPlaying.title} setNowPlaying={setNowPlaying} />
            </Toolbar>
        </AppBar>

    );
}
