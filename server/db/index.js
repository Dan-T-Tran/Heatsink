const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/heatsink', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

const heatSchema = new mongoose.Schema({
  name: String,
  score: Number,
  // date: String,
});

export default heatSchema;