// src/components/CartItem.jsx (Código Corregido)

import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {

  // Función para manejar el cambio en el input de cantidad
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    
    if (newQuantity >= 1) {
      // CORRECCIÓN 1: Enviamos el ID, el COLOR, y la nueva cantidad
      onUpdateQuantity(item.id, item.selectedColor, newQuantity);
    } else {
        // Opcional: Si el usuario pone 0, lo eliminamos
        handleRemove();
    }
  };

  // Función para manejar la eliminación
  const handleRemove = () => {
    // CORRECCIÓN 2: Enviamos el ÍTEM COMPLETO para que el contexto use ID y Color
    onRemove(item); 
  };
  
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span>{item.name}</span>
        <small>Color: {item.selectedColor}</small>
        <small>Precio: ${item.price.toFixed(2)}</small>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
        />
        {/* Usamos la función corregida handleRemove */}
        <button onClick={handleRemove}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItem;