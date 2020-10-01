import React, { useState, useEffect } from 'react';
import { CssBaseline, Button } from '@material-ui/core';
import { getYoutubeIdFromSearch } from './functions';
import Video from './components/Video';
import AppBar from './components/AppBar';
import VideoGrid from './components/VideoGrid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import GlobalChat from './components/GlobalChat';

const App = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ videos, setVideos ] = useState([]);
	const [ queue, setQueue ] = useState([]);
	const [ nowPlaying, setNowPlaying ] = useState();
	const [ user, setUser ] = useState();
	const [ globalChatOpen, setGlobalChatOpen ] = useState(false);

	const handleSearchTermInput = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmitVideoSearch = async (e) => {
		e.preventDefault();
		const results = await getYoutubeIdFromSearch(searchTerm);
		setVideos(results);
	};

	useEffect(
		() => {
			if (!nowPlaying && queue.length > 0) {
				const nextInQueue = queue[0];
				setNowPlaying(nextInQueue);
				setQueue(queue.slice(1));
			}
		},
		[ nowPlaying ]
	);

	const darkTheme = createMuiTheme({
		palette: {
			primary: {
				light: '#241b3d',
				main: '#5c37c4',
				dark: '#303030',
				contrastText: '#fff'
			},

			secondary: {
				light: '#ffffff',
				main: '#2ad156',
				dark: '#2ad156',
				contrastText: '#fff'
			},

			type: 'light'
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
				setUser={setUser}
				user={user}
				setGlobalChatOpen={setGlobalChatOpen}
			/>

			<VideoGrid
				videos={videos}
				nowPlaying={nowPlaying}
				setNowPlaying={setNowPlaying}
				queue={queue}
				setQueue={setQueue}
			/>

			<Video id={nowPlaying && nowPlaying.id} setNowPlaying={setNowPlaying} />

			<GlobalChat user={user} open={globalChatOpen} setOpen={setGlobalChatOpen} />
		</ThemeProvider>
	);
};

export default App;
