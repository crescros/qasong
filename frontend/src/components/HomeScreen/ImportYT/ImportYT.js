import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Fade, Typography, TextField, Button, Grid } from "@material-ui/core";
import { getYoutubePlaylist } from "../../../functions";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "600px",
  },
  confirm: {
    border: "2px solid #000",
    backgroundColor: theme.palette.secondary.main,
  },
  format: {
    display: "grid",
    justifyContent: "center",
  },
  space: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
}));

export default function TransitionsModal({ showImport, setShowImport, queue, setQueue }) {
  const classes = useStyles();
  const [playlistLink, setplaylistLink] = React.useState();
  const [visible, setVisibility] = React.useState(false);

  const handleClose = () => {
    setShowImport(false);
    setVisibility(false);
  };

  const handleInput = (url) => {
    setplaylistLink(url.target.value);
  };

  const handleImportPlaylist = () => {
    if (playlistLink) {
      // Pass URL to request for playlist object
      getYoutubePlaylist(playlistLink).then((playlist) => {
        if (playlist.data) {
          handleAddPlaylistQueue(playlist);
          // Close window after playlist returns
          setplaylistLink();
          handleClose();
        } else {
          setVisibility(true);
        }
      });
    } else {
      setVisibility(true);
    }
  };

  function handleAddPlaylistQueue(playlist) {
    const currentQids = queue.map((song) => song.qid);

    const songsNotAlreadyInQueue = playlist.data.filter((song) => {
      return !currentQids.includes(song.qid);
    });
    setQueue([...queue, ...songsNotAlreadyInQueue]);
  }

  return (
    <div>
      <Dialog className={classes.modal} open={showImport} onClose={handleClose}>
        <Fade in={showImport}>
          <div className={classes.paper}>
            <Typography gutterBottom variant="h4" align="center">
              Youtube Playlist
            </Typography>

            <Grid>
              <Grid>
                <TextField
                  onChange={handleInput}
                  id="playlistURL"
                  label="Playlist Link"
                  variant="outlined"
                  fullWidth={true}
                />
              </Grid>
              <Grid className={classes.space}>
                {visible && (
                  <Typography className={classes.error}>
                    Invalid URL or Playlist Exceeds 100 Items
                  </Typography>
                )}
              </Grid>
              <Grid className={classes.format}>
                <Button
                  className={classes.confirm}
                  onClick={handleImportPlaylist}
                  variant="contained"
                >
                  Import
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Dialog>
    </div>
  );
}
