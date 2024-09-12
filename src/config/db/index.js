const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failture");
  }
};

module.exports = { connect };
