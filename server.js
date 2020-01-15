
// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const port = 3000;

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log(`server is up and running on port ${port}`);
})



// GET Route
app.get('/weather', (req, res)=>{
    res.send(projectData);
})

// POST Route
app.post('/add', (req, res)=>{
    console.log(req.body)
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    console.log(projectData);
    res.send(projectData);
})