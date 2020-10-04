import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import { formatVideoTitle } from '../functions'

const style = {
	cursor: 'move',
	display: 'inline-block'
};

export default function ImgMediaCard({
	title,
	thumbnailUrl,
	id,
	nowPlaying,
	onClick,
	index,
	moveCard
}) {
	const [playing, setPlaying] = useState(false);

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

	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: "card",
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		item: { type: "card", id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
			<Card ref={ref} style={{ backgroundColor: playing && '#2ad156', ...style, opacity }}>
				<CardActionArea style={{ height: '200px' }} onClick={onClick}>
					<CardMedia component="img" alt={title} height="140" image={thumbnailUrl} title={title} />
					<CardContent style={{ height: '80px' }}>
						<Typography gutterBottom>
							{formatVideoTitle(title)}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>

					{index == 0 && <Button color='secondary' variant='contained' onClick={onClick}>PLAY NEXT</Button>}
				</CardActions>
			</Card>
	);
}
