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
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import { getDurationFromQueue } from "../../../../../functions";

const useStyles = makeStyles((theme) => ({
  playlist: {
    borderColor: theme.palette.secondary.main,
    border: "2px solid",
    maxWidth: 500,
    margin: "auto",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "75%",
    maxHeight: "75%",
  },
}));

function Playlist({
  playlist,
  setQueue,
  setQueueName,
  setNowPlaying,
  nowPlaying,
  queue,
  addSongToQueue,
}) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(true);

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

  function CollapsedPlaylist() {
    return playlist.queue.slice(0, 4).map((song) => {
      return (
        <PlaylistItem
          key={song.qid}
          {...{ song, handleStopSong, nowPlaying, setNowPlaying, addSongToQueue }}
        />
      );
    });
  }

  function UncollapsedPlaylist() {
    return playlist.queue.map((song) => {
      return (
        <PlaylistItem
          key={song.qid}
          {...{ song, handleStopSong, nowPlaying, setNowPlaying, addSongToQueue }}
        />
      );
    });
  }

  const duration = getDurationFromQueue(playlist.queue);

  return (
    <Grid
      key={playlist.id}
      container
      alignItems="center"
      item
      className={classes.playlist}
      data-playlist_id={playlist.id}
    >
      <Grid item xs={4}>
        <Box align="center">
          <ButtonBase onClick={handlePlaylistClick}>
            <img className={classes.img} alt="complex" src={playlist.image} />
          </ButtonBase>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography gutterBottom align="center">
          <Link
            color="textPrimary"
            component="button"
            variant="h4"
            onClick={handlePlaylistClick}
          >
            {playlist.name}
          </Link>
        </Typography>

        <Typography color="textSecondary" align="center">
          {playlist.queue.length} songs, {duration}
        </Typography>

        <Box align="center">
          <IconButton title="play playlist" onClick={handlePlaylistClick}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton title="add playlist to queue" onClick={handleAddToQueueClick}>
            <AddToPhotosIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <List>
          {collapsed ? <CollapsedPlaylist /> : <UncollapsedPlaylist />}
          <ListItem onClick={() => setCollapsed(!collapsed)} key="collapseControl" button>
            <ListItemText
              disableTypography
              color="secondary"
              primary={
                <Typography color="secondary" align="center">
                  {collapsed ? "...See More" : "See Less"}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Playlist;
