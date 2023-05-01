//using mogoose
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config({ path: "../config.env" });

const URL = process.env.MONGO_DB_ATLAS_URI;
const DbName = process.env.MONGO_DB_NAME;

const connectDB = () => {
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB_NAME,
      dbName: DbName,
    });
    console.log(colors.bgYellow("MongoDB connected ..."));
  } catch (err) {
    console.log(err);
    // process.exit(1);
  }
};

module.exports = { connectDB };
