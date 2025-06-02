import { useState, useCallback } from 'react';
import axios from 'axios';
import { endpoints } from '../config/api';

const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(endpoints.items);
      setItems(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener items';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const getItemById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${endpoints.items}/${id}`);
      setSelectedItem(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener el item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = async (itemData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(endpoints.items, itemData);
      setItems(prevItems => [...prevItems, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear el item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${endpoints.items}/${id}`, itemData);
      setItems(prevItems => 
        prevItems.map(item => 
          item.ItemID === id ? response.data : item
        )
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${endpoints.items}/${id}`);
      setItems(prevItems => prevItems.filter(item => item.ItemID !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar el item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    selectedItem,
    loading,
    error,
    fetchItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    setSelectedItem
  };
};

export default useItems; 