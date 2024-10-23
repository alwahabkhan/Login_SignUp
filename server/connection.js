const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected Successfully");
  } catch (error) {
    console.log("Error in Mongo", error);
  }
};
