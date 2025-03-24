const mongoose = require("mongoose");
const Login = require("../models/Login");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await Login.updateMany({},{password:"$2b$10$2D9nDvBsZyd986lzbdbk2eNKGWL/mTT9hrpuEzDf71fnNVnYzrMGm"})
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
