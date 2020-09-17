// import dependencies
const express = require('express');
const cors = require('cors')

// initialize express
const app = express();
app.use(cors())
app.use(express.static('public'))

// start server
const port = process.env.PORT || 3016
app.listen(port, () => {
    console.log('Express server is running at http://localhost:' + port)
})