const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/heatsink', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

const heatSchema = new mongoose.Schema({
  name: String,
  score: Number,
  date: String,
  kills: Number,
  difficulty: Number,
});

const HeatScores = mongoose.model('HeatScores', heatSchema);

module.exports = HeatScores;