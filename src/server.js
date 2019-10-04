const express = require("express");
const path = require("path");

const routes = require("./routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/", routes);

app.listen(port, () => {
  console.log("App listening on port http://localhost:5000");
});
