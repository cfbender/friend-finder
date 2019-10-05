const data = require("../../data/friends.json");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json(data);
});

router.post("/", (req, res) => {
  console.log(req.body.answers);
  //   data.friends.push(req.body);
});

module.exports = router;
