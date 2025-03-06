const express = require("express");
const router = express.Router();
const { getUsers, loginUser, registerUser } = require("../controllers/login.controllers.js");

router.get("/", getUsers);
router.post("/", loginUser);
router.post("/register", registerUser);

module.exports = router;
