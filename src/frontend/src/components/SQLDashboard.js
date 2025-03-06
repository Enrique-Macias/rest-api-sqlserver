import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const SQLDashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching SQL items:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard de SQL Server</h2>
      <p>Mostrando datos almacenados en <strong>Microsoft SQL Server</strong>.</p>

      <button className="switch-button" onClick={() => navigate("/mongo-dashboard")}>
        🔄 Ir al Dashboard de MongoDB
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.ItemID}>
            {item.ItemName} - {item.Description} - ${item.Price} - Stock: {item.Stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SQLDashboard;
