import React from 'react';
import { FaHome, FaHeart, FaShoppingCart, FaPlay } from "react-icons/fa";
import SocialSidebar from './SocialSidebar'; // <-- componente donde moviste los iconos sociales
import "../styles/FooterNav.css";

export default React.memo(function FooterNav({ onOpenCart, cart = [] }) {
  // safeCart ya tiene valor por defecto en los props
  const safeCart = Array.isArray(cart) ? cart : [];
  // evitar NaN si item.quantity es undefined
  const totalItems = safeCart.reduce((total, item) => total + (Number(item?.quantity) || 0), 0);

  const navButtons = [
    { icon: <FaHome />, label: "Inicio", onClick: () => (window.location.href = '/') },
    { icon: <FaHeart />, label: "Favoritos" },
    { icon: <FaShoppingCart />, label: "Carrito", onClick: onOpenCart, counter: totalItems },
    { icon: <FaPlay />, label: "Play" }
  ];

  return (
    <footer className="footer-nav">
      <div className="nav-buttons-wrapper">
        {navButtons.map((btn, i) => (
          <button
            key={i}
            className={`nav-btn ${btn.label === "Carrito" ? 'cart-btn' : ''}`}
            onClick={btn.onClick}
            aria-label={btn.label}
            aria-pressed={btn.label === "Carrito" ? (btn.counter > 0) : undefined}
            type="button"
          >
            {btn.icon}
            <span>{btn.label}</span>
            {btn.counter > 0 && <span className="cart-counter" aria-hidden="true">{btn.counter}</span>}
          </button>
        ))}
      </div>

      {/* Renderiza el componente con los enlaces sociales que moviste */}
      <div className="social-links">

      </div>
    </footer>
  );
});
