import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "330px",
    margin: "0 auto",
    borderColor: theme.palette.secondary.main,
    border: "2px solid",
    borderRadius: theme.spacing(2),
    cursor: "pointer",
  },
  footer: {
    background:
      theme.palette.type === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
    borderRadius: "0 0 16px 16px",
  },
}));

function BillboardTop100Item({ item, setSearchTerm }) {
  const classes = useStyles();

  function handleClick() {
    setSearchTerm(item.title + " " + item.artist);
  }

  return (
    <Box align="center" className={classes.root} onClick={handleClick}>
      <Grid container justify="center">
        <Grid item xs={3}>
          <img src={item.cover} width="64px" />
        </Grid>
        <Grid item xs={9}>
          <Typography>
            #{item.rank}: {item.title}
          </Typography>
          <Typography>by {item.artist}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Typography variant="caption">
            last week: #{item.position.positionLastWeek} | highest: #
            {item.position.peakPosition} | weeks on chart: {item.position.weeksOnChart}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BillboardTop100Item;
