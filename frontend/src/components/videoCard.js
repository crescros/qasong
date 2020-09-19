import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 340,
        marginBottom: 20
    },
});

export default function ImgMediaCard({ title, description, thumbnailUrl, id, setNowPlaying, nowPlaying }) {

    const [playing, setPlaying] = useState(false)

    const classes = useStyles();

    function handlePlayButton() {
        if (!playing) {
            setNowPlaying({
                title: title,
                description: description,
                id: id,
                thumbnailUrl: thumbnailUrl
            })
            setPlaying(true)
        } else {
            setNowPlaying({})
            setPlaying(false)
        }
    }

    useEffect(() => {
        if (nowPlaying && nowPlaying.id === id) {
            setPlaying(true)
        } else {
            setPlaying(false)
        }
    }, [nowPlaying])

    return (
        <Card className={classes.root} style={{ backgroundColor: playing && "red" }}>
            <CardActionArea style={{height:"340px"}} onClick={handlePlayButton}  >
                <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={thumbnailUrl}
                    title={title}
                />
                <CardContent
                    style={{height:"200px"}}
                >
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    )
};
