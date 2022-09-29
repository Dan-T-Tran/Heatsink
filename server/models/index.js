const db = require('../db');

const get = async () => {
  const documents = await db.find();
  console.log(documents);
};

const post = async (data) => {
  const document = await db.save(data);
  console.log(document);
}

exports.get = get;
exports.post = post;