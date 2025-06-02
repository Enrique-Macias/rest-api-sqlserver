import React, { useEffect, useState } from 'react';
import './LifecycleDemo.css';

const LifecycleDemo = () => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(true);

  // Efecto para el montaje y desmontaje
  useEffect(() => {
    console.log('🟢 Componente montado');
    
    // Función de limpieza que se ejecuta al desmontar
    return () => {
      console.log('🔴 Componente desmontado');
    };
  }, []); // Array vacío significa que solo se ejecuta al montar y desmontar

  // Efecto para las actualizaciones
  useEffect(() => {
    console.log('🔄 Componente actualizado - count:', count);
  }); // Sin array de dependencias, se ejecuta en cada render

  // Efecto específico para cambios en count
  useEffect(() => {
    console.log('📊 Count actualizado a:', count);
  }, [count]); // Se ejecuta solo cuando count cambia

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleToggleMount = () => {
    setMounted(prev => !prev);
  };

  if (!mounted) {
    return (
      <div className="lifecycle-demo">
        <h2>Componente Desmontado</h2>
        <button onClick={handleToggleMount}>
          Remontar Componente
        </button>
      </div>
    );
  }

  return (
    <div className="lifecycle-demo">
      <h2>Demostración del Ciclo de Vida</h2>
      <p>Contador: {count}</p>
      <div className="lifecycle-buttons">
        <button onClick={handleIncrement}>
          Incrementar Contador
        </button>
        <button onClick={handleToggleMount}>
          Desmontar Componente
        </button>
      </div>
      <div className="lifecycle-info">
        <p>⚠️ Abre la consola del navegador para ver los logs del ciclo de vida</p>
        <ul>
          <li>🟢 Montaje: Cuando el componente se crea</li>
          <li>🔄 Actualización: Cuando el componente se actualiza</li>
          <li>🔴 Desmontaje: Cuando el componente se elimina</li>
        </ul>
      </div>
    </div>
  );
};

export default LifecycleDemo; 