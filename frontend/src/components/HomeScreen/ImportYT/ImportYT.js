import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Fade, Typography, TextField, Button, Grid } from "@material-ui/core";
//import ytlist from "youtube-playlist";

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
  error: {
    textAlign: "center",
    color: "red",
    visibility: "hidden",
  },
}));

export default function TransitionsModal({ showImport, setShowImport }) {
  const classes = useStyles();
  const [playlistLink, setplaylistLink] = React.useState();

  const handleClose = () => {
    setShowImport(false);
  };

  const handleInput = (url) => {
    setplaylistLink(url.target.value);
  };

  const handleImportPlaylist = () => {
    console.log(playlistLink);
    // ytlist(playlistLink, "url").then((res) => {
    //   console.log(res);
    // });
  };

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
              <Typography className={classes.error}>Invalid URL</Typography>
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
