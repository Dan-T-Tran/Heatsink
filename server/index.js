require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const { getScores, postScore } = require('./controllers');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})
// app.get('/', (req, res) => {
  // res.sendStatus(201);
// })

app.get('/heatsink', getScores);

app.post('/heatsink', postScore);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});