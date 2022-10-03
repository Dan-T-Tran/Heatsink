require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/heatsink', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@heatsink-cluster.efwwkwt.mongodb.net/?retryWrites=true&w=majority
`, {useNewUrlParser: true, useUnifiedTopology: true});


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