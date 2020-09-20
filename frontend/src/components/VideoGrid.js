import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import VideoCard from './VideoCard';

console.log(process.env);

function VideoGrid({ videos, nowPlaying, setNowPlaying, queue, setQueue }) {
	return (
		<Grid style={{ marginTop: '60px' }} container direction="row" justify="center" alignItems="center">
			{videos.map((video) => {
				const url = video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url;
				const title = video.snippet.title;

				const gridItem = (
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						lg={4}
						xl={3}
						key={video.id.videoId}
						children={
							<VideoCard
								id={video.id.videoId}
								thumbnailUrl={url}
								title={title}
								description={video.snippet.description}
								nowPlaying={nowPlaying}
								setNowPlaying={setNowPlaying}
								queue={queue}
								setQueue={setQueue}
							/>
						}
					/>
				);

				return gridItem;
			})}

			{videos.length == 0 && (
				<Typography variant="h1" style={{ color: 'black' }}>
					{process.env.REACT_APP_NAME.toUpperCase()}
				</Typography>
			)}
		</Grid>
	);
}

export default VideoGrid;
