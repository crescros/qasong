import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		height: 400
	}
});

export default function ImgMediaCard({
	title,
	description,
	thumbnailUrl,
	id,
	setNowPlaying,
	nowPlaying,
	queue,
	setQueue
}) {
	const [ playing, setPlaying ] = useState(false);
	const classes = useStyles();

	useEffect(
		() => {
			if (nowPlaying && nowPlaying.id === id) {
				setPlaying(true);
			} else {
				setPlaying(false);
			}
		},
		[ nowPlaying ]
	);

	function handlePlayButton() {
		if (!playing) {
			setNowPlaying({
				title: title,
				description: description,
				id: id,
				thumbnailUrl: thumbnailUrl
			});
			setPlaying(true);
		} else {
			setNowPlaying({});
			setPlaying(false);
		}
	}

	function handleAddQueue() {
		setQueue(
			queue.concat({
				title: title,
				description: description,
				id: id,
				thumbnailUrl: thumbnailUrl
			})
		);
	}

	return (
		<Card className={classes.root} style={{ backgroundColor: playing && '#2ad156', margin: '0px auto 20px auto' }}>
			<CardActionArea style={{ height: '340px' }} onClick={handlePlayButton}>
				<CardMedia component="img" alt={title} height="140" image={thumbnailUrl} title={title} />
				<CardContent style={{ height: '200px' }}>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button onClick={handleAddQueue}>Add to Queue</Button>
				<Button onClick={handlePlayButton}>{playing ? 'STOP' : 'PLAY'}</Button>
			</CardActions>
		</Card>
	);
}
