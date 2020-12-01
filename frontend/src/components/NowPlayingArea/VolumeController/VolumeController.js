import React from "react";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';


function ProgressBar({ volume, setVolume }) {

    function handleChange(e, newValue) {
        setVolume(newValue / 100)
    }

    return (
        <Box px={3}>
            <Grid container justify="center" spacing={2}>
                <Grid item >
                    <VolumeDownIcon />
                </Grid>
                <Grid item xs>
                    <Slider color="secondary" value={volume * 100} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <VolumeUpIcon />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProgressBar;
