import React from 'react'
import { Box, Grid, Typography } from "@material-ui/core"

function HomeScreen() {
    return (
        <Box mt={4}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6}>
                    <Typography
                        align="center"
                        variant="h1"
                        style={{ color: "black", fontSize: "8vw" }}
                        xs={12}
                    >
                        {process.env.REACT_APP_NAME.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
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
            </Grid>
        </Box>
    )
}

export default HomeScreen