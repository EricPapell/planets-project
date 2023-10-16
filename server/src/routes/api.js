const express = require("express");
//routes
const planetRouter = require("./planets/planets.router");
const launchRouter = require("./launches/launches.router");

const api = express.Router();

//here to take care of request in routes
api.use("/planets", planetRouter);
api.use("/launches", launchRouter);

module.exports = api;
