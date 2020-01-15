// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const cors = require('cors');
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
const port = 3000;
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server and callback to debug
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
})
// GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
})
// POST Route
app.post('/add', (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.send(projectData);
})