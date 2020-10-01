import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import VideoSearch from './VideoSearch';
import UserSection from './UserSection';
import EnvironmentBadges from './EnvironmentBadges'

export default function MusicAppBar({
	handleSubmitVideoSearch,
	handleSearchTermInput,
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
						<img src='https://discord.com/assets/94db9c3c1eba8a38a1fcf4f223294185.png' height='32px' style={{ filter: 'invert(1)' }}/>
					</IconButton>
					<EnvironmentBadges />
				</div>

				<VideoSearch
					handleSearchTermInput={handleSearchTermInput}
					handleSubmitVideoSearch={handleSubmitVideoSearch}
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
