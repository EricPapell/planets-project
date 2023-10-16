const mongoose = require("mongoose");

require("dotenv").config();

//MONGODB URL TO CONNECT TO THE DATABASE
const MONGO_URL = process.env.MONGO_URL;

//event emitter if there are succes or errors in the conexion
mongoose.connection.once("open", () => {
  console.log("CONNECTED TO MONGODB");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
