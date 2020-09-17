// import dependencies
const express = require('express');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();

// initialize express
const app = express();
app.use(cors())
app.use(express.static('public'))

app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q        
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey){
        res.send('Error: config file missing youtube API key')
        return
    }

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&key=${apiKey}`).then(response => {
        const youtubeID = response.data.items[0].id.videoId
        res.send(youtubeID)
    })
})

// start server
const port = process.env.PORT || 3016
app.listen(port, () => {
    console.log('Express server is running at http://localhost:' + port)
})