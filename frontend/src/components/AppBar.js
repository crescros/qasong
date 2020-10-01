import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import NowPlayingInfo from './NowPlayingInfo';
import VideoSearch from './VideoSearch';
import UserSection from './UserSection';
import EnvironmentBadges from './EnvironmentBadges'

export default function MusicAppBar({
	handleSubmitVideoSearch,
	handleSearchTermInput,
	nowPlaying,
	setNowPlaying,
	queue,
	user,
	setUser,
	setGlobalChatOpen
}) {

	return (
		<AppBar position="static">
			<Toolbar
				display="flex"
				style={{ justifyContent: 'space-between' }}
			>
				<div>

					<Typography
						display='inline'
						style={{ marginRight: '20px' }}
						children={process.env.REACT_APP_NAME}
					/>
					<IconButton href='https://discord.gg/Xkpvnz9' target='_blank'>
						<img src='https://discord.com/assets/e7a3b51fdac2aa5ec71975d257d5c405.png' height='32px' />
					</IconButton>
					<EnvironmentBadges />
				</div>

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
					setGlobalChatOpen={setGlobalChatOpen}
				/>
			</Toolbar>
		</AppBar>
	);
}
