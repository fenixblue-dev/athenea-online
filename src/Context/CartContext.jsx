// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el Hook para usar el Contexto
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Crear el Proveedor (Provider)
export const CartProvider = ({ children }) => {
  // Estado inicial del carrito
  const [cart, setCart] = useState([]);

  // Función de ayuda para encontrar el índice (por ID y Color)
  const findItemIndex = (id, selectedColor) => {
    return cart.findIndex(
      item => item.id === id && item.selectedColor === selectedColor
    );
  };

  // A. Añadir Producto
  const addToCart = (product, quantity = 1, selectedColor) => {
    const index = findItemIndex(product.id, selectedColor);

    if (index !== -1) {
      // Si existe, actualiza la cantidad de forma inmutable
      const newCart = [...cart];
      newCart[index].quantity += quantity;
      setCart(newCart);
    } else {
      // Si no existe, añade el nuevo ítem
      const newItem = { ...product, quantity, selectedColor };
      setCart(prevCart => [...prevCart, newItem]);
    }
  };

  // B. Actualizar Cantidad
  // Recibe id, selectedColor y la nueva cantidad
  const updateQuantity = (id, selectedColor, newQuantity) => {
    if (newQuantity < 1) {
        // Si la nueva cantidad es 0 o menos, eliminamos el ítem
        const itemToRemove = { id, selectedColor };
        removeItem(itemToRemove);
        return;
    }

    // Mapea y devuelve un NUEVO array con el ítem actualizado
    const newCart = cart.map(item => {
      if (item.id === id && item.selectedColor === selectedColor) {
        return { ...item, quantity: newQuantity };
      }
      return item; 
    });

    setCart(newCart);
  };
  
  // C. Eliminar Producto
  // Recibe el objeto itemToRemove (con id y selectedColor)
  const removeItem = (itemToRemove) => {
      setCart(prevCart => 
          // Filtra y devuelve solo los ítems que NO coinciden en ID y Color
          prevCart.filter(item => 
              !(item.id === itemToRemove.id && item.selectedColor === itemToRemove.selectedColor)
          )
      );
  };

  // D. Vaciar Carrito
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    // (Opcional) Puedes añadir aquí el total si no quieres calcularlo en los componentes
    total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};