import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NowPlayingInfo from './NowPlayingInfo';
import VideoSearch from './VideoSearch';
import UserSection from './UserSection';

export default function MusicAppBar({
	handleSubmitVideoSearch,
	handleSearchTermInput,
	nowPlaying,
	setNowPlaying,
	queue,
	user,
	setUser
}) {
	return (
		<AppBar position="static">
			<Toolbar
				display="flex"
				style={{ justifyContent: 'space-between' }}
			>
				<Typography
					style={{ marginRight: '20px' }}
					children={process.env.REACT_APP_NAME}
				/>

				<VideoSearch
					handleSearchTermInput={handleSearchTermInput}
					handleSubmitVideoSearch={handleSubmitVideoSearch}
				/>

				<NowPlayingInfo
					title={nowPlaying && nowPlaying.title}
					setNowPlaying={setNowPlaying}
					queue={queue}
				/>

				<UserSection
					user={user}
					setUser={setUser}
				/>
			</Toolbar>
		</AppBar>
	);
}
