import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Slider, Grid } from "@material-ui/core";
import { VolumeUp, VolumeDown } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    // width: 200,
  },
});

function volumeBar({ volume, setVolume, condensed }) {
  function handleChange(e, newValue) {
    setVolume(newValue / 100);
  }
  const classes = useStyles();
  return (
    <Box className={classes.root} px={3}>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <VolumeDown onClick={() => setVolume(0)} />
        </Grid>
        <Grid item xs align="center">
          <Slider color="secondary" value={volume * 100} onChange={handleChange} />
        </Grid>
        {!condensed && (
          <Grid item>
            <VolumeUp onClick={() => setVolume(1)} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default volumeBar;
