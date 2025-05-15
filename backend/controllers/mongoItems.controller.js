const MongoItem = require("../models/MongoItem");

// Obtener todos los items
const getMongoItems = async (req, res) => {
  try {
    const items = await MongoItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo item
const createMongoItem = async (req, res) => {
  try {
    const newItem = new MongoItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item de MongoDB creado exitosamente", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un item
const updateMongoItem = async (req, res) => {
  try {
    const updatedItem = await MongoItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }
    res.json({ message: "Item actualizado", item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un item
const deleteMongoItem = async (req, res) => {
  try {
    const deletedItem = await MongoItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }
    res.json({ message: "Item eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMongoItems, createMongoItem, updateMongoItem, deleteMongoItem };