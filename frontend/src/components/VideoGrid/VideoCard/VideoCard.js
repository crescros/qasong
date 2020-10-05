import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, IconButton } from '@material-ui/core';
import uuid from 'react-uuid'
import { 
	PlayArrow as PlayArrowIcon,
	Pause as PauseIcon,
	Queue as QueueIcon,
} from "@material-ui/icons";
import { formatVideoTitle } from '../../../functions'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		height: 280
	}
});

export default function ImgMediaCard({
	title,
	description,
	thumbnailUrl,
	smallThumbnailUrl,
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
				qid: uuid(),
				thumbnailUrl: thumbnailUrl,
				smallThumbnailUrl: smallThumbnailUrl
			})
		);
	}

	return (
		<Card className={classes.root} style={{ backgroundColor: playing && '#2ad156', margin: '0px auto 20px auto' }}>
			<CardActionArea style={{ height: '220px' }} onClick={handlePlayButton}>
				<CardMedia component="img" alt={title} height="140" image={thumbnailUrl} title={title} />
				<CardContent style={{ height: '90px' }}>
					<Typography gutterBottom variant="h6">
						{formatVideoTitle(title)}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<IconButton size={"small"} onClick={handleAddQueue}>
					<QueueIcon />
				</IconButton>
				<IconButton onClick={handlePlayButton}>
					{playing ? <PauseIcon/> : <PlayArrowIcon />}
				</IconButton>
			</CardActions>
		</Card>
	);
}
