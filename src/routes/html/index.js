const router = require("express").Router();
const path = require("path");

router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../../..", "/public/survey.html"));
});

module.exports = router;
