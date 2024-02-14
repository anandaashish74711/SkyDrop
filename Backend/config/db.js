require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error);
    process.exit(1);
  }
};