require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const { getScores, postScore } = require('./controllers');

app.use(express.json());

app.get('/heatsink', getScores);

app.post('/heatsink', postScore);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});