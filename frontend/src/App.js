import React, { Component } from "react";
import { Container, Button, Typography } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'


const App = () => {
    
    const handleClickPlay = () => {
        console.log(getYoutubeIdFromSearch('hello'))
    }

    return (<Container>
        <Typography>Music App</Typography>
        <Button onClick={handleClickPlay}>Play</Button>
    </Container>
    );
}

export default App;
