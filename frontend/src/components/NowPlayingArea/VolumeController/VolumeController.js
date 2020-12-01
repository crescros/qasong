import React from "react";
import { Box, Slider, Grid } from "@material-ui/core";
import { VolumeUp, VolumeDown } from "@material-ui/icons";

function ProgressBar({ volume, setVolume }) {

  function handleChange(e, newValue) {
    setVolume(newValue / 100);
  }

  return (
    <Box px={3}>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <VolumeDown onClick={()=>setVolume(0)}/>
        </Grid>
        <Grid item xs>
          <Slider color="secondary" value={volume * 100} onChange={handleChange} />
        </Grid>
        <Grid item>
          <VolumeUp onClick={()=>setVolume(1)} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgressBar;
