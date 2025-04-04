const express = require("express");
const router = express.Router();
const { getMongoItems, createMongoItem, updateMongoItem, deleteMongoItem } = require("../controllers/mongoItems.controller");
const verifyToken = require("../middleware/auth");

// Apply authentication middleware to all routes
router.use(verifyToken);

router.get("/", getMongoItems);
router.post("/", createMongoItem);
router.put("/:id", updateMongoItem);
router.delete("/:id", deleteMongoItem);

module.exports = router;
