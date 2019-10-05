const express = require("express");
const path = require("path");

const routes = require("./routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "client/build")));
app.use(express.json());
app.use("/", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/build/index.html"));
});
app.listen(port, () => {
  console.log("App listening on port http://localhost:5000");
});
