import mongoose from "mongoose";

interface Options {
  url: string;
  dbName: string
}

export class MongoDatabase {

  async connect (options: Options){
    try {
      const { url, dbName } = options;

      await mongoose.connect(url, { dbName });

      console.log("MongoDB connected")
    } catch (error) {
     console.log("MongoDB connection error")
     throw error;
    }
  }
}
