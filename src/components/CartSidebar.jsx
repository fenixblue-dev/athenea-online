import React from "react";
import { FaTimes, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "../styles/CartSidebar.css";

const CartSidebar = ({ cart, isOpen, onClose, onRemove, onUpdateQuantity, onClear }) => {
  // Calcula el total una sola vez
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Función para manejar la compra
  const handleCheckout = () => {
    if (cart.length > 0) {
      // Muestra la alerta de confirmación
      alert('🎉 ¡Gracias por tu compra! El total es: $' + total.toFixed(2));
      
      onClear();  // Vacía el carrito
      onClose();  // Cierra el sidebar
    } else {
      alert('Tu carrito está vacío. ¡Agrega algunos productos!');
    }
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>🛒 Tu Carrito</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p className="empty">Tu carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div key={`${item.id}-${item.selectedColor}`} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="info">
                <h4>{item.name}</h4>
                <p>Color: {item.selectedColor}</p>
                <p>Precio: ${item.price.toFixed(2)}</p>
                
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? onUpdateQuantity(item.id, item.selectedColor, item.quantity - 1)
                        : onRemove(item) // Elimina si la cantidad es 1
                    }
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button className="remove-btn" onClick={() => onRemove(item)}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER DEL CARRITO (Solo se muestra si hay items) */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <p className="total">Total: ${total.toFixed(2)}</p>
          
          <div className="footer-actions">
            
            {/* BOTÓN 1: FINALIZAR COMPRA */}
            <button 
                className="checkout-button"
                onClick={handleCheckout}
                disabled={cart.length === 0} 
            >
                Finalizar Compra
            </button>
            
            {/* BOTÓN 2: VACIAR CARRITO */}
            <button className="clear-btn" onClick={onClear}>
                <FaTrash /> Vaciar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;