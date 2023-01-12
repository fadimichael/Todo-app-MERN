//using mogoose
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config({ path: "../config.env" });
// dotenv.config({ path: "../config.env" });
const url = process.env.MONGO_DB_ATLAS_URI;

const connectDB = () => {
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log(colors.bgYellow("MongoDB connected ..."));
  } catch (err) {
    console.log(err);
    // process.exit(1);
  }
};

module.exports = { connectDB };
