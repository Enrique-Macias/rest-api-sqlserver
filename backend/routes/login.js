// routes/login.js
const express = require("express");
const router = express.Router();
const { getUsers, loginUser } = require("../controllers/login.controllers.js");

router.get("/", getUsers);
router.post("/", loginUser);

module.exports = router;
