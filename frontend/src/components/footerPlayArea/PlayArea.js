import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'; 
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { borders } from '@material-ui/system';
import { Stop as StopIcon } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    height: 75,
  },
  grow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function BottomAppBar({nowPlaying, queue, videos, setNowPlaying}) {
  const classes = useStyles();

function stopTheSong() {
  setNowPlaying({});
}

  if(!nowPlaying || !nowPlaying.title){
    return(
      <div></div>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.grow}>
        <Typography>
          {  nowPlaying.title } 
        </Typography>
        <IconButton onClick={stopTheSong}>
          <StopIcon />
        </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}