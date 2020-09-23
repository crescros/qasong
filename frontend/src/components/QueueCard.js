import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button } from '@material-ui/core';
import { formatVideoTitle } from '../functions'

const useStyles = makeStyles({
	root: {
		width: 310,
		height: 240
	}
});

export default function ImgMediaCard({
	title,
	thumbnailUrl,
	id,
	nowPlaying,
	onClick,
	i
}) {
	const [playing, setPlaying] = useState(false);
	const classes = useStyles();

	useEffect(
		() => {
			if (nowPlaying && nowPlaying.id === id) {
				setPlaying(true);
			} else {
				setPlaying(false);
			}
		},
		[nowPlaying]
	);



	return (
		<Card className={classes.root} style={{ backgroundColor: playing && '#2ad156', margin: '0px auto 20px auto' }}>
			<CardActionArea style={{ height: '200px' }} onClick={onClick}>
				<CardMedia component="img" alt={title} height="140" image={thumbnailUrl} title={title} />
				<CardContent style={{ height: '80px' }}>
					<Typography gutterBottom>
						{formatVideoTitle(title)}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>

				{i == 0 && <Button color='secondary' variant='contained' onClick={onClick}>PLAY NEXT</Button>}
			</CardActions>
		</Card>
	);
}
