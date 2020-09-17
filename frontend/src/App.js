import React, { useState } from "react";
import { Container, Button, Typography, TextField } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'


const App = () => {

    const [searchTerm, setSearchTerm] = useState('')


    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = await getYoutubeIdFromSearch(searchTerm)
        console.log(id)
    }

    return (<Container>
        <Typography variant='h1'>Music App</Typography>
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearchTermInput} />
            <Button>Play</Button>
        </form>
    </Container>
    );
}

export default App;
