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
import StopIcon from "@material-ui/icons/Stop";
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
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

// const socialLinks = [
//   {
//     name: "Spotify",
//     url:
//       "https://open.spotify.com/artist/3nSzAb7gPqal1yRAi2qbbc?si=eHxjQMkpTmWIeejAyv18KA",
//     icon: <i className="fab fa-spotify"></i>,
//   },
// ];

function Playlist({
  playlist,
  setQueue,
  setQueueName,
  setNowPlaying,
  nowPlaying,
  queue,
}) {
  const classes = useStyles();

  function handlePlaylistClick() {
    setQueue(playlist.queue);
    setNowPlaying(playlist.queue[0]);
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

  function handleStopSong(e) {
    e.stopPropagation();
    setNowPlaying({});
  }

  function PlaylistItem({ song }) {
    const currentlyPlaying = song.videoId === nowPlaying?.videoId;

    return (
      <ListItem
        key={song.videoId}
        onClick={() => {
          setNowPlaying(song);
        }}
        button
        selected={currentlyPlaying}
      >
        {currentlyPlaying && (
          <IconButton size="small" onClick={handleStopSong}>
            <StopIcon />
          </IconButton>
        )}
        <ListItemText primary={song.title} />
      </ListItem>
    );
  }

  function UncollapsedPlaylist() {
    return playlist.queue.map((song) => {
      return <PlaylistItem key={song.qid} {...{ song }} />;
    });
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
          <ButtonBase onClick={handlePlaylistClick}>
            <img className={classes.img} alt="complex" src={playlist.image} />
          </ButtonBase>
        </Box>
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item container>
          <Box pl={2}>
            <Typography gutterBottom>
              <Link
                color="textPrimary"
                component="button"
                variant="h4"
                onClick={handlePlaylistClick}
              >
                {playlist.name}
              </Link>
            </Typography>
            <IconButton title="play playlist" onClick={handlePlaylistClick}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton title="add playlist to queue" onClick={handleAddToQueueClick}>
              <AddToPhotosIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <List>
            <UncollapsedPlaylist />

            <ListItem key="link" component="a" href="https://hitmanhunna.com" button>
              <ListItemText
                primary={
                  <Typography color="secondary" align="center">
                    hitmanhunna.com
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Playlist;
