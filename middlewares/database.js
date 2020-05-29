import { MongoClient, ObjectID } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default async function (req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.objectID = ObjectID;
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  return next();
}