require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/heatsink', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

console.log('PERHAPS HERE?')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const heatSchema = new mongoose.Schema({
  name: String,
  score: Number,
  date: String,
  kills: Number,
  difficulty: Number,
});

const HeatScores = mongoose.model('HeatScores', heatSchema);

module.exports = HeatScores;