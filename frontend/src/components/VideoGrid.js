import React from 'react'
import { Grid } from '@material-ui/core'
import VideoCard from './VideoCard'
import PoweredByYoutube from './PoweredByYoutube'

function VideoGrid({ videos, nowPlaying, setNowPlaying }) {

    return (
        <Grid
            style={{ marginTop: '20px' }}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {videos.map(video => {
                const url = video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url
                const title = video.snippet.title

                const gridItem = <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <VideoCard
                        id={video.id.videoId}
                        thumbnailUrl={url}
                        title={title}
                        description={video.snippet.description}
                        nowPlaying={nowPlaying}
                        setNowPlaying={setNowPlaying}
                    />
                </Grid>

                return gridItem
            })}
        </Grid>
    )
}

export default VideoGrid
