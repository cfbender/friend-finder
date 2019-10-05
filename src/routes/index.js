const api = require("./api");
const routes = require("express").Router();
const path = require("path");

routes.use("/api", api);

module.exports = routes;
