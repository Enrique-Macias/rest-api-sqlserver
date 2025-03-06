const express = require("express");
const router = express.Router();
const { getMongoItems, createMongoItem, updateMongoItem, deleteMongoItem } = require("../controllers/mongoItems.controller");

router.get("/", getMongoItems);
router.post("/", createMongoItem);
router.put("/:id", updateMongoItem);
router.delete("/:id", deleteMongoItem);

module.exports = router;
