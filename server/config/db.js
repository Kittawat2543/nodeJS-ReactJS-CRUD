const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/notnorth");
    console.log("DB connected");
  } catch (err) {
    console.log("cant connect DB", err);
  }
};

module.exports = connectDB;
