// Install packages
const { resolveSoa } = require('dns');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { readAndAppend } = require('../../01-Activities/28-Stu_Mini-Project/Main/helpers/fsUtils');

// Assign port to use
const PORT = process.env.port || 3001;

// Initialize express
const app = express();

// Develop boilerplate middleware for app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for notes page (logic borrowed from instructor solution of mini project 11)
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET API route for JSON
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

// POST API route for JSON note. ID generation logic taken from W3 schools. POST request logic taken from codeforgeek (https://codeforgeek.com/handle-get-post-request-express-4/) and activities in module 11.
app.post('api/notes', (req, res) => {
    const {title, text} = req.body;
    const newNote = {title, text, id: Math.floor(Math.random() * 101)};
    readAndAppend(newNote, '/db/db.json');
    res.end('Note added successfully!');
});

// GET route for homepage (logic borrowed from instructor solution of mini project 11)
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
