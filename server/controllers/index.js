const { get, post } = require('../models');

const getScores = async (req, res) => {
  const documents = await get();
  if (documents) {
    res.status(200).send(documents);
  } else {
    res.sendStatus(500);
  }
};

const postScore = async (req, res) => {
  const { name, score, date, difficulty } = req.body;
  const document = await post({ name, score, date, difficulty });
  if (document) {
    res.status(201).send(document);
  } else {
    res.sendStatus(500);
  }
};

exports.getScores = getScores;
exports.postScore = postScore;