const express = require("express");
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require("../controllers/items.controllers.js");
const verifyToken = require("../middleware/auth");

// Apply authentication middleware to all routes
router.use(verifyToken);

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;