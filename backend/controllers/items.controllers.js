const { sql, poolPromise } = require("../config/db");

// Obtener todos los items
const getItems = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Items");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Obtener un item por ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ItemID", sql.Int, id)
      .query("SELECT * FROM Items WHERE ItemID = @ItemID");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Crear un nuevo item
const createItem = async (req, res) => {
  try {
    const { ItemName, Description, Price, Stock } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("ItemName", sql.VarChar, ItemName)
      .input("Description", sql.VarChar, Description)
      .input("Price", sql.Float, Price)
      .input("Stock", sql.Int, Stock)
      .query("INSERT INTO Items (ItemName, Description, Price, Stock) VALUES (@ItemName, @Description, @Price, @Stock)");
    res.status(201).json({ message: "Item creado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Actualizar un item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { ItemName, Description, Price, Stock } = req.body;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("ItemID", sql.Int, id)
      .input("ItemName", sql.VarChar, ItemName)
      .input("Description", sql.VarChar, Description)
      .input("Price", sql.Float, Price)
      .input("Stock", sql.Int, Stock)
      .query("UPDATE Items SET ItemName = @ItemName, Description = @Description, Price = @Price, Stock = @Stock WHERE ItemID = @ItemID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json({ message: "Item actualizado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Eliminar un item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("ItemID", sql.Int, id)
      .query("DELETE FROM Items WHERE ItemID = @ItemID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json({ message: "Item eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
