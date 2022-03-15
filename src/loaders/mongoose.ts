import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const dbUri = config.DB_URI;
  const connection = await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
