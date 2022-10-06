const db = require('../db');

const get = async () => {
  const documents = await db.find().sort({score: 'desc'});
  console.log('MAYBE HERE? ', documents);
  return documents;
};

const post = async (data) => {
  const newDocument = new db(data);
  const document = await newDocument.save(data);
  return document;
}

exports.get = get;
exports.post = post;