const data = require("../../data/friends.json");
const fs = require("fs-extra");
const path = require("path");
const router = require("express").Router();
const bestMatch = require("../../bestMatch");

router.get("/", (req, res) => {
  res.status(200).json(data);
});

router.post("/", async (req, res) => {
  let match = await bestMatch(req.body, data);
  match.show = true;
  data.friends.push(req.body);
  try {
    await fs.writeJson(
      path.join(__dirname, "../..", "/data/friends.json"),
      data
    );
    console.log("Wrote to friends.json");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(match);
});

module.exports = router;
