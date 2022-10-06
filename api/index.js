require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.DBPORT || 8080;
const path = require('path');
const { getScores, postScore } = require('./controllers');

app.use(express.json());

// app.use(express.static(path.join(__dirname, '..//build')));
// app.use(express.static(path.join(__dirname, '..//public')));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "heatsink", "build", "index.html"));
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'))
// })

app.get('/heatsink', getScores);

app.post('/heatsink', postScore);

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports = app;