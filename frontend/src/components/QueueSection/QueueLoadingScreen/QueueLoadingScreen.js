import React from 'react'
import {Box, Grid, Typography, CircularProgress } from "@material-ui/core"

function QueueLoadingScreen({isLoadingQueue}) {

    if (!isLoadingQueue){
        return<div></div>
    }

    return (
        <Box m={2}>
          <Grid container justify="center">
            <Grid item>
              <Typography>Loading Queue...</Typography>
            </Grid>
            <Grid item>
              <CircularProgress color="secondary" size="32px" />
            </Grid>
          </Grid>
        </Box>
    )
}

export default QueueLoadingScreen
