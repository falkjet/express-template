const mongodb = require("mongodb");

const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URL);
const database = mongoClient.db();
module.exports = { mongoClient, database };
