import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "430px",
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
  img: {
    borderRadius: "0 14px 0 0",
    margin: "0 0 0 auto",
    height: theme.spacing(14),
    width: theme.spacing(14),
  },
}));

function BillboardTop100Item({ item, setSearchTerm, handleSubmitVideoSearch }) {
  let history = useHistory();

  const classes = useStyles();

  function handleClick() {
    setSearchTerm(item.title + " " + item.artist);
    handleSubmitVideoSearch();
    history.push("/search");
  }

  const rankDiff = item.position.positionLastWeek
    ? item.position.positionLastWeek - item.rank
    : null;

  let rankDiffDisplay;

  if (rankDiff > 0) {
    rankDiffDisplay = <TrendingUpIcon color="secondary" />;
  } else if (rankDiff < 0) {
    rankDiffDisplay = <TrendingDownIcon color="error" />;
  } else if (rankDiff === 0) {
    rankDiffDisplay = <ArrowRightAltIcon color="disabled" />;
  } else {
    rankDiffDisplay = "";
  }

  let rankColor;

  if (item.rank <= 10) {
    rankColor = "secondary";
  } else if (item.rank <= 50) {
    rankColor = "initial";
  } else {
    rankColor = "textSecondary";
  }

  return (
    <Box align="center" className={classes.root} onClick={handleClick}>
      <Grid container justify="center">
        <Grid item container xs={8} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h5" color={rankColor}>
              {item.rank}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5">{item.title}</Typography>
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={12}>
            <Typography color="textSecondary">by</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{item.artist}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Box align="right">
            <img className={classes.img} src={item.cover} />
          </Box>
        </Grid>
        <Grid item container xs={12} className={classes.footer}>
          {/* position details */}
          <Grid item xs={2}>
            <Typography variant="caption" align="left">
              {rankDiffDisplay}
            </Typography>
          </Grid>

          {/* position details */}
          <Grid item xs={10}>
            <Typography variant="caption" align="left">
              {item.position.positionLastWeek &&
                "last week: " + item.position.positionLastWeek + " | "}
              {item.position.peakPosition !== item.rank &&
                " highest: " + item.position.peakPosition + " | "}
            </Typography>
            <Typography variant="caption" align="left">
              weeks on chart: {item.position.weeksOnChart}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BillboardTop100Item;
