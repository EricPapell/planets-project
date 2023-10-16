//express
//packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const api = require("./routes/api");

//cors options
const corsOptions = {
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200,
};

const app = express();

//cors whitlist
app.use(cors(corsOptions));
//para captar informacion sobre las requests
app.use(morgan("combined"));
//json transformation of data
app.use(express.json());

//heret to create and prefix the router father with the version and there willl be cretaed the other routes
app.use("/v1", api);
//if there is another version you could
// app.use("/v2", api2);

//to serve the react app in placed in the server
app.use(express.static(path.join(__dirname, "..", "public")));

//MUUUUUUUUUUUST
//GET THE GENERAL INDEX TO RUN THE FRONT END ENTERILY
//SOOO THAT IF THERE IS NO ROUTE IN THE SERVER, THE ROUTING COMES FROM THE CLIENT
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
