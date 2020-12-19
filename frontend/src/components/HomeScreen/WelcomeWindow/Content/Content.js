import React from "react";
import { Typography, Box, Link, Grid } from "@material-ui/core";

// function getDaysRemaining() {
//   const releaseDate = "12/20/2020";

//   const date1 = new Date();
//   const date2 = new Date(releaseDate);

//   const difference_In_Time = date2.getTime() - date1.getTime();
//   const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
//   return Math.round(difference_In_Days);
// }

function Content() {
  return (
    <Box>
      <Typography gutterBottom variant="h3" align="center">
        Welcome to Qasong
      </Typography>
      <Typography align="center" variant="h5">
        What is Qasong?
      </Typography>
      <Typography align="center" color="secondary">
        Qasong is an ad free music streaming web app
      </Typography>

      <Box p={2} />

      <Typography align="center" variant="h5">
        What can I do here?
      </Typography>
      <Typography align="center">You can use Qasong to build and play music</Typography>
      <Typography align="center">
        playlists from any device. You can search for
      </Typography>
      <Typography align="center">any song hosted on youtube, or browse music</Typography>
      <Typography align="center">in our featured playlists or the</Typography>
      <Typography align="center">
        <Link href="https://qasong.com/billboard" color="secondary">
          US billboard top 100 Songs for this week.
        </Link>
      </Typography>

      <Box p={2} />

      <Typography align="center" variant="h5">
        Can I upload a playlist to Qasong?
      </Typography>
      <Typography align="center">
        Not yet, but we plan to add user accounts and{" "}
      </Typography>
      <Typography align="center">user generated content in version 2</Typography>

      <Box p={2} />

      <Typography align="center" variant="h5">
        How do I get started?
      </Typography>
      <Typography align="center">
        Use the search bar in the top left corner of the app{" "}
      </Typography>
      <Typography align="center">
        to search for music by song name, artist name, lyrics,{" "}
      </Typography>
      <Typography align="center">
        {" "}
        or anything else. You can play songs from the search results,{" "}
      </Typography>
      <Typography align="center">
        {" "}
        or add them to your queue to start building a playlist{" "}
      </Typography>

      <Box p={3} />

      <Typography align="center" variant="h4" gutterBottom>
        Qasong Development
      </Typography>
      <Typography align="center" variant="h5">
        Developed with <b>YOUTUBE</b>
      </Typography>
      <Typography align="center">All music featured on qasong.com is </Typography>
      <Typography align="center">hosted by youtube</Typography>

      <Box p={2} />

      <Typography align="center" variant="h5">
        Currently Under Development
      </Typography>
      <Typography align="center">Qasong is currently under development, so</Typography>
      <Typography align="center">some aspects of the application may be</Typography>
      <Typography align="center">unfinished or not functioning.</Typography>

      <Box p={2} />

      <Typography align="center" variant="h5">
        Who made this?
      </Typography>
      <Typography align="center">Code for qasong.com is created by</Typography>
      <Typography align="center">
        open source contributers on{" "}
        <Link
          href="https://github.com/IanWalston/qasong"
          target="_blank"
          color="secondary"
        >
          GitHub{" "}
        </Link>
      </Typography>

      <Box p={1} />

      <Typography align="center" variant="h5">
        Contact the developers
      </Typography>
      <Typography align="center">To request a feature, report a bug, or</Typography>
      <Typography align="center">find out how to get involved with Qasong, </Typography>
      <Typography align="center">
        <Link href="https://discord.com/invite/VnpcrtYnrS" color="secondary">
          join us on Discord.
        </Link>
      </Typography>

      <Box p={2} />

      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Typography align="center" variant="caption" color="textSecondary">
            Qasong team 2020
          </Typography>
        </Grid>
        <Grid item>
          <img src="./static/img/qasong.svg" width="32px" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Content;
