import React from "react";
import { Box, Grid, Typography, Link } from "@material-ui/core";
import VideoSearch from "../AppBar/VideoSearch/VideoSearch";

function HomeScreen({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  searchTerm,
  showHomeScreen,
}) {
  if (!showHomeScreen) {
    return <div id="empty-div"></div>;
  }

  return (
    <Box mt={4}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <Typography
            align="center"
            variant="h1"
            style={{ color: "#888888", fontSize: "8vw" }}
            xs={12}
          >
            {process.env.REACT_APP_NAME}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            align="center"
            style={{
              color: "#888888",
              letterSpacing: "2px",
              wordSpacing: "16px",
            }}
          >
            {process.env.REACT_APP_TAGLINE}
          </Typography>
        </Grid>

        <Grid item>
        
        </Grid>
        <Grid item container justify="center">
          <VideoSearch
            handleSearchTermInput={handleSearchTermInput}
            handleSubmitVideoSearch={handleSubmitVideoSearch}
            searchTerm={searchTerm}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
          />
        </Grid>

        <Grid item>
          <Box mt={12}>
            <Typography>Featured Playlists</Typography>
            <Typography><Link href="./?queue=4uaPrB00eEc&queue=7jRVLxLtHhI&queue=7-zbteBz7-I&queue=BIjvj0tYOZI&queue=0f5fodAO_Vk&queue=oivalAvc2xU&queueName=High%20At%20Work">High at Work - Ryan Celsius</Link></Typography>
            <Typography><Link href="http://localhost:8080/?queue=3wLSdLIBvPg&queue=ctiKD8jtvV8&queue=rqkMsXcHQYg&queue=fLndnUeWlQo&queue=v5NeyI4-fdI&queue=JukTvlrh-Wk&queue=wauzrPn0cfg&queue=4oMTH10nrxk&queue=Fihxa4Q7q1g&queue=Xk2uObQDKtw&queueName=High%20At%20Work">Rage Against the Machine - Rage Against the Machine</Link></Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeScreen;
