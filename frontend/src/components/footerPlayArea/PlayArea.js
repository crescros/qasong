import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'; 
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { borders } from '@material-ui/system';



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

export default function BottomAppBar() {
  const classes = useStyles();


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.grow}>
            <IconButton>
                <PlayCircleOutlineIcon style={{ fontSize: 35 }} />
            </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}