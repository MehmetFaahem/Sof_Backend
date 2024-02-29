import { config } from 'dotenv';
config();

export default {
  uri: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
};
