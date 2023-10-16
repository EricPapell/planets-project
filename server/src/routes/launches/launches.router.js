const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewlLaunches,
  httpDeletelLaunches,
} = require("./launches.controller");

const launchRouter = express.Router();
launchRouter.get("/", httpGetAllLaunches);
launchRouter.post("/", httpAddNewlLaunches);
launchRouter.delete("/:id", httpDeletelLaunches);

module.exports = launchRouter;
