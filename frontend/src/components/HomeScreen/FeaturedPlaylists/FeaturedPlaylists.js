import React from 'react'
import featuredPlaylists from "./featuredPlaylists.json"
import { Paper, ButtonBase, Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    playlist: {
        margin: '20px',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

}));

function FeaturedPlaylists({
    setQueue,
    setNowPlaying,
    setShowQueue
}) {
    const classes = useStyles();

    function handlePlaylistClick(e) {
        const playlistId = e.target.dataset.playlist_id
        const selectedPlaylist = featuredPlaylists.find(playlist => playlist.id === playlistId)

        setQueue(selectedPlaylist.queue)
        setNowPlaying(selectedPlaylist.queue[0])
        setShowQueue(true)
    }

    return (
        <div className={classes.root}>
            

                    {featuredPlaylists.map(playlist => {
                        return <Grid container item spacing={2} className={classes.playlist} onClick={handlePlaylistClick} data-playlist_id={playlist.id}>
                            <Grid item xs={5} sm={3}>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={playlist.image} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={7} sm={9} container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography align="center" gutterBottom variant="h5">
                                            <Link color="textPrimary" variant="h5" onClick={handlePlaylistClick} data-playlist_id={playlist.id}>
                                                {playlist.name}
                                            </Link>
                                        </Typography>
                                        {
                                            playlist.queue.map(song => {
                                                return <Typography><Link color="textPrimary" component="button" onClick={() => {
                                                    setNowPlaying(song)
                                                }} >{song.title}</Link></Typography>
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    })}
        </div >

    )
}

export default FeaturedPlaylists
