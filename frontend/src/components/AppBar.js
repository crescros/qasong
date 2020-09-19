import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NowPlayingInfo from './NowPlayingInfo';
import VideoSearch from './VideoSearch';
import LoginModal from './LoginModal';

export default function MusicAppBar({ handleSubmitVideoSearch, handleSearchTermInput, nowPlaying, setNowPlaying, queue }) {
	return (
		<AppBar position="static">
			<Toolbar display="flex" style={{ justifyContent: 'space-between' }}>
				<Typography style={{ marginRight: '20px' }}>Music App</Typography>
				<VideoSearch
					handleSearchTermInput={handleSearchTermInput}
					handleSubmitVideoSearch={handleSubmitVideoSearch}
				/>
				<NowPlayingInfo
					title={nowPlaying && nowPlaying.title} 
					setNowPlaying={setNowPlaying}
					queue = {queue} 
				/>
				<LoginModal />
			</Toolbar>
		</AppBar>
	);
}
