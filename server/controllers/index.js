const { get, post } = require('../models');

const getScores = (req, res) => {
  const documents = get();
  console.log('CONTROLLERS', documents);
  res.sendStatus(501);
};

const postScore = (req, res) => {
  const { name, score } = req.body;
  const document = post({ name, score });
  console.log('CONTROLLER POST', document);
  res.sendStatus(501);
};

exports.getScores = getScores;
exports.postScore = postScore;