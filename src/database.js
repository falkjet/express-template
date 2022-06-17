import mongodb from "mongodb";

export const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URL);
export const database = mongoClient.db();
