import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    marginLeft: "7px",
  },
  sliderColor: {
    color: theme.palette.secondary.main,
  },
}));

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(100);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Slider
            className={classes.sliderColor}
            value={value}
            onChange={handleChange}
            aria-labelledby="volume-slider"
          />
        </Grid>
      </Grid>
    </div>
  );
}
