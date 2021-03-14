// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('public'));


// Setup Server
const port = 8080;
const server = app.listen(port, console.log(`Server is running on port ${port}`))

// Register POST request to save data into our endpoint
app.post('/temp', (req, res) => {
    const data = req.body
    projectData = {
        city: data.cityName,
        date: data.currentDate,
        temp: data.cityTemp,
        user: data.userResponse
    }
})

// Register GET request to retrieve endpoint data
app.get('/retrieve', (req, res) => {
    res.send(projectData)
})