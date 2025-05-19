import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaBox, FaDollarSign, FaInfoCircle, FaLayerGroup } from 'react-icons/fa';
import { endpoints } from '../config/api';
import Navbar from './Navbar';
import './ItemInfo.css';

const ItemInfo = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${endpoints.items}/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la información del item');
        setLoading(false);
        console.error('Error fetching item:', err);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="item-info-loading">Cargando información...</div>
      </>
    );
  }

  if (error || !item) {
    return (
      <>
        <Navbar />
        <div className="item-info-error">
          <p>{error || 'Item no encontrado'}</p>
          <button onClick={() => navigate('/sql-dashboard')} className="back-button">
            <FaArrowLeft /> Volver al Dashboard
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="item-info-container">
        <div className="item-info-card">
          <div className="item-info-header">
            <button onClick={() => navigate('/sql-dashboard')} className="back-button">
              <FaArrowLeft /> Volver
            </button>
            <h2>Detalles del Item</h2>
          </div>

          <div className="item-info-content">
            <div className="info-section">
              <div className="info-item">
                <FaBox className="info-icon" />
                <div className="info-content">
                  <label>Nombre</label>
                  <span>{item.ItemName}</span>
                </div>
              </div>

              <div className="info-item">
                <FaInfoCircle className="info-icon" />
                <div className="info-content">
                  <label>Descripción</label>
                  <span>{item.Description}</span>
                </div>
              </div>

              <div className="info-item">
                <FaDollarSign className="info-icon" />
                <div className="info-content">
                  <label>Precio</label>
                  <span>${item.Price}</span>
                </div>
              </div>

              <div className="info-item">
                <FaLayerGroup className="info-icon" />
                <div className="info-content">
                  <label>Stock</label>
                  <span>{item.Stock} unidades</span>
                </div>
              </div>
            </div>

            <div className="item-info-actions">
              <button 
                className="edit-button"
                onClick={() => navigate(`/sql-dashboard?edit=${item.ItemID}`)}
              >
                Editar Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemInfo; 