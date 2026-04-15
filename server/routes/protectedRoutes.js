const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/dashboard", auth, (req, res) => {
  res.json({ msg: "Welcome User" });
});

router.get("/admin", auth, role("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

module.exports = router;