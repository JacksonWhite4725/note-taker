// Install packages
const { resolveSoa } = require('dns');
const express = require('express');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');

// Assign port to use
const PORT = process.env.port || 3001;

// Initialize express
const app = express();

// Develop boilerplate middleware for app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for homepage (logic borrowed from instructor solution of mini project 11)
app.get('*', (req, res) =>
    res.sendfile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page (logic borrowed from instructor solution of mini project 11)
app.get('/notes', (req, res) =>
    res.sendfile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
