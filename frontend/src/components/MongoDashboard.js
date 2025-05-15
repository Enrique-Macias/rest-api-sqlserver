import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const MongoDashboard = () => {
  const [mongoItems, setMongoItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMongoItems();
  }, []);

  const fetchMongoItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/mongo-items");
      setMongoItems(response.data);
    } catch (error) {
      console.error("Error fetching MongoDB items:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard de MongoDB</h2>
      <p>Mostrando datos almacenados en <strong>MongoDB Atlas</strong>.</p>

      <button className="switch-button" onClick={() => navigate("/sql-dashboard")}>
        🔄 Ir al Dashboard de SQL Server
      </button>

      <ul>
        {mongoItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MongoDashboard;
