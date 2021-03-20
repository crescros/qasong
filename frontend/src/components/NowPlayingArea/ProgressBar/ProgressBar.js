import React from "react";
import { Slider, Grid, Box } from "@material-ui/core";

//import { formatSeconds } from "../../../functions";

function ProgressBar({ songProgress, songDuration, changeTime }) {
  function handleChange(e, newValue) {
    changeTime(newValue);
  }

  return (
    <Box px={3}>
      <Grid container spacing={2}>
        {/*<Grid item>
          <Typography style={{ fontSize: 12 }} color="textSecondary">
            {formatSeconds(songProgress)}
          </Typography>
        </Grid>*/}
        <Grid item xs>
          <Slider
            color="secondary"
            value={songProgress}
            max={songDuration}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item>
          <Typography style={{ fontSize: 12 }} color="textSecondary">
            {formatSeconds(songDuration)}
          </Typography>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default ProgressBar;
