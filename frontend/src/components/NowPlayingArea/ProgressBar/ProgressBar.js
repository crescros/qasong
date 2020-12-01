import React from "react";
import { Slider, Typography, Grid, Box } from "@material-ui/core";

import { formatSeconds } from "../../../functions"

function ProgressBar({ songProgress, songDuration }) {
  return (
    <Box px={3}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="secondary">{formatSeconds(songProgress)}</Typography>
        </Grid>
        <Grid item xs>
          <Slider color="secondary" value={songProgress} max={songDuration} />
        </Grid>
        <Grid item>
          <Typography color="textSecondary">{formatSeconds(songDuration)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgressBar;
