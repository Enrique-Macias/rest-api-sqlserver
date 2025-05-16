import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../config/api";
import Navbar from "./Navbar";
import "./Dashboard.css";

const SQLDashboard = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ItemName: "",
    Description: "",
    Price: "",
    Stock: ""
  });
  const navigate = useNavigate();

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Configure axios defaults
  axios.defaults.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.items);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching SQL items:", error);
      if (error.response?.status === 401) {
        // Handle unauthorized access
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        await axios.put(`${endpoints.items}/${selectedItem.ItemID}`, formData);
      } else {
        await axios.post(endpoints.items, formData);
      }
      setShowForm(false);
      setSelectedItem(null);
      setFormData({
        ItemName: "",
        Description: "",
        Price: "",
        Stock: ""
      });
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${endpoints.items}/${id}`);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      ItemName: item.ItemName,
      Description: item.Description,
      Price: item.Price,
      Stock: item.Stock
    });
    setShowForm(true);
  };

  const handleLogout = () => {
    // Limpiar el token
    localStorage.removeItem("token");
    // Limpiar el header de autorización
    delete axios.defaults.headers.common["Authorization"];
    // Redirigir al login
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2>Dashboard de SQL Server</h2>
            <p>Mostrando datos almacenados en <strong>Microsoft SQL Server</strong>.</p>
          </div>
        </div>

        <button 
          className="add-button"
          onClick={() => {
            setSelectedItem(null);
            setFormData({
              ItemName: "",
              Description: "",
              Price: "",
              Stock: ""
            });
            setShowForm(true);
          }}
        >
          ➕ Agregar Nuevo Item
        </button>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedItem ? "Editar Item" : "Nuevo Item"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="ItemName"
                    value={formData.ItemName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descripción:</label>
                  <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio:</label>
                  <input
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock:</label>
                  <input
                    type="number"
                    name="Stock"
                    value={formData.Stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                  <button type="submit">{selectedItem ? "Actualizar" : "Crear"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.ItemID}>
                  <td>{item.ItemName}</td>
                  <td>{item.Description}</td>
                  <td>${item.Price}</td>
                  <td>{item.Stock}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Editar</button>
                    <button onClick={() => handleDelete(item.ItemID)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SQLDashboard;
