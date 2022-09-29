require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const { getScores, postScore } = require('./controllers');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../heatsink/build')));
app.use(express.static(path.join(__dirname, '../heatsink/public')));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "heatsink", "build", "index.html"));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../heatsink/public', 'index.html'))
})

app.get('/heatsink', getScores);

app.post('/heatsink', postScore);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});