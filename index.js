// import dependencies
const express = require('express');
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
require('dotenv').config();
require('rootpath')();


// initialize express
const app = express();
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());


app.use('/api/users', require('./users/users.controller'));

// video search api endpoint
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

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 3016
app.listen(port, () => {
    console.log('Express server is running at http://localhost:' + port)
})