import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import VideoSearch from './VideoSearch'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({ handleSubmitVideoSearch, handleSearchTermInput, nowPlaying }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >

                        <Grid item xs={1}>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6}>
                            { nowPlaying && nowPlaying.title && <Typography>Now Playing: { nowPlaying.title }</Typography> }
                        </Grid>

                        <Grid item xs={3}>
                            <VideoSearch onSubmit={handleSubmitVideoSearch} handleSearchTermInput={handleSearchTermInput} />
                        </Grid>
                        
                        <Grid item xs={2}>
                            <Button color="inherit">Login</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}