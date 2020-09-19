import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VideoCard from './VideoCard'

function displayShitName() {
    return (
    <Typography variant="h1">
        artistify.xyz
    </Typography>)
}

function VideoGrid({ videos, nowPlaying, setNowPlaying, queue, setQueue }) {

        return <Grid
            style={{ marginTop: '20px' }}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {videos.map(video => {
                const url = video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url
                const title = video.snippet.title

                const gridItem = <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.id.videoId}>
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
                </Grid>

                return gridItem
            })}

            { videos.length == 0 && displayShitName() }

        </Grid>
        }

export default VideoGrid
