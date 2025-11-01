import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import config from 'config'

dotenv.config();
const uri = config.get<string>('db.uri');
const client = new MongoClient(uri);
console.log(" URI de connexion:", uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connexion à la base de données réussie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
  }
};

export const getDB = () => client.db();