const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const mongoURI = process.env.MONGO_URI;

async function connectToMongo() {
  console.log("Connecting to Database ");
  try {
    let x = await mongoose.connect("mongodb://127.0.0.1:27017/FlipkartClone");
    console.log("Connected to Database:  " + x.connections[0].name);
    return true;
  } catch (e) {
    // console.log(e);
    return false;
  }
}

module.exports = connectToMongo;
