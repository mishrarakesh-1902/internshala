const express = require("express");
const router = express.Router();
const { distributeListToAgent } = require("../controllers/distributeController");

router.post("/distribute", distributeListToAgent);

module.exports = router;
