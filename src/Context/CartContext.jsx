import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    console.warn('useCart usado fuera de CartProvider');
    return {
      cart: [],
      addToCart: () => {},
      updateQuantity: () => {},
      removeItem: () => {},
      clearCart: () => {},
      total: 0,
    };
  }
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    if (!product || !product.id) return;
    setCart(prev => {
      const idx = prev.findIndex(
        i => i.id === product.id && (i.selectedColor || null) === (selectedColor || null)
      );
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 0) + quantity };
        return copy;
      }
      return [...prev, { ...product, quantity, selectedColor }];
    });
  };

  const updateQuantity = (id, selectedColor = null, newQuantity) => {
    if (typeof newQuantity !== 'number') return;
    setCart(prev =>
      prev
        .map(i =>
          i.id === id && (i.selectedColor || null) === (selectedColor || null)
            ? { ...i, quantity: newQuantity }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (itemToRemove) => {
    if (!itemToRemove || !itemToRemove.id) return;
    setCart(prev =>
      prev.filter(i => !(i.id === itemToRemove.id && (i.selectedColor || null) === (itemToRemove.selectedColor || null)))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;