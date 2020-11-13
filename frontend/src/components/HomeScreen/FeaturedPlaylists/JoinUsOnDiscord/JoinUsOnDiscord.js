import React from "react";
import {
    CardActionArea,
    Grid,
    Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    playlist: {
        borderColor: "#ffae5c",
        border: "2px solid",
        maxWidth: 500,
        margin: "auto",
        padding: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    svg: {
        filter: theme.palette.type === "dark" ? "none" : "invert(1)",
        width: "64px"
    }
}));

function Playlist({

}) {
    const classes = useStyles();


    return (
        <Grid
            key={"discord"}
            item
        >
            <CardActionArea
                href="https://discord.com/invite/kczTtg8VDP"
                className={classes.playlist}>
                <Grid container alignContent="center" justify="center" alignItems="center">
                    <Grid item xs={12} sm={3}>
                        <img className={classes.svg} src="./img/discord.svg"></img>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography align="center" color="secondary">
                            Join Us On Discord
                        </Typography>
                        <Typography align="center" variant="body2" color="textSecondary">
                            contact the Qasong Team
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <img width="80px" src="./img/qasong.svg"></img>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Grid>
    );
}

export default Playlist;
