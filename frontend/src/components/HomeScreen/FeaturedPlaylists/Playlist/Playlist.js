import React from "react";
import {
  Box,
  ButtonBase,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  playlist: {
    borderColor: "#ffae5c",
    border: "2px solid",
    maxWidth: 500,
    margin: "auto",
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {},
  image: {
    width: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function Playlist({
  playlist,
  setQueue,
  setQueueName,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
}) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(true);

  function handlePlaylistClick() {
    setQueue(playlist.queue);
    setNowPlaying(playlist.queue[0]);
    setShowQueue(true);
    setQueueName(playlist.name);
  }

  function handleAddToQueueClick() {
    const currentQids = queue.map((song) => song.qid);

    const songsNotAlreadyInQueue = playlist.queue.filter((song) => {
      return !currentQids.includes(song.qid);
    });

    setQueue([...queue, ...songsNotAlreadyInQueue]);
    setQueueName(playlist.name);
  }

  function CollapsedPlaylist() {
    return playlist.queue.slice(0, 4).map((song) => {
      return (
        <ListItem
          key={song.videoId}
          onClick={() => {
            setNowPlaying(song);
          }}
          button
          selected={song.videoId === nowPlaying?.videoId}
        >
          <ListItemText primary={song.title} />
        </ListItem>
      )
    })
  }

  function UncollapsedPlaylist() {
    return playlist.queue.map((song) => {
      return (
        <ListItem
          key={song.videoId}
          onClick={() => {
            setNowPlaying(song);
          }}
          button
          selected={song.videoId === nowPlaying?.videoId}
        >
          <ListItemText primary={song.title} />
        </ListItem>
      )
    })
  }

  return (
    <Grid
      key={playlist.id}
      container
      item
      className={classes.playlist}
      data-playlist_id={playlist.id}
    >
      <Grid item xs={12}>
        <Box align="center">
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={playlist.image} />
          </ButtonBase>
        </Box>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item>
            <Typography gutterBottom>
              <Link
                color="textPrimary"
                component="button"
                variant="h4"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                {playlist.name}
              </Link>
            </Typography>
            <IconButton
              title="play playlist"
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              title="add playlist to queue"
              onClick={() => handleAddToQueueClick(playlist.id)}
            >
              <AddToPhotosIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <List>
              {collapsed
                ? <CollapsedPlaylist />
                : <UncollapsedPlaylist />}
              <ListItem
                onClick={() => setCollapsed(!collapsed)}
                key="collapseControl"
                button
              >
                <ListItemText
                  disableTypography
                  color="secondary"
                  primary={
                    <Typography color="secondary">
                      {collapsed ? "... See More" : "See Less"}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Playlist;
