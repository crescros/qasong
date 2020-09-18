import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button ,Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard({ title, description, thumbnailUrl, id, setNowPlaying }) {

    const [playing, setPlaying] = useState(false)

    const classes = useStyles();


    function handlePlayButton() {
        setPlaying(!playing)
    }

    useEffect(() => {

        if (playing) {
            setNowPlaying({
                title: title,
                description: description,
                id: id,
                thumbnailUrl: thumbnailUrl
            })
        } else {
            setNowPlaying()
        }

    }, [playing])

    return (
        <Card className={classes.root} bgcolor={"secondary"}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={thumbnailUrl}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={handlePlayButton} size="small" color={playing ? "secondary" : "primary"}>
                    {playing ? "Stop" : "Play"}
                </Button>
                <Button size="small" color="primary">
                    Add to Queue
                </Button>
            </CardActions>

        </Card>
    )
};
