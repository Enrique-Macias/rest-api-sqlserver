// routes/login.js
const express = require("express");
const router = express.Router();
const { getUsers, loginUser } = require("../controllers/login.controllers.js");

router.get("/", getUsers);
router.post("/login", loginUser);

module.exports = router;
