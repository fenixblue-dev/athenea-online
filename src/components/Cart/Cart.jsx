// src/components/Cart.jsx (Corregido)

import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, onRemove, onUpdateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra!');
    // Aquí puedes agregar la lógica para redireccionar o limpiar el carrito.
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <CartItem
                // CLAVE CORREGIDA: Usa ID y COLOR para la unicidad
                key={`${item.id}-${item.selectedColor}`} 
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </ul>
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
          <button className="checkout-button" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;