const api = require("./api");
const html = require("./html");
const routes = require("express").Router();
const path = require("path");

routes.use("/api", api);
routes.use("/", html);

routes.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "/public/index.html"));
});

module.exports = routes;
