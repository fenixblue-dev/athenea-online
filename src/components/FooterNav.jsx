import React from 'react';
import { FaHome, FaHeart, FaShoppingCart, FaPlay, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "../styles/FooterNav.css";

export default React.memo(function FooterNav({ onOpenCart, cart = [] }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const navButtons = [
    { icon: <FaHome />, label: "Inicio", onClick: () => window.location.href = '/' },
    { icon: <FaHeart />, label: "Favoritos" },
    { icon: <FaShoppingCart />, label: "Carrito", onClick: onOpenCart, counter: totalItems },
    { icon: <FaPlay />, label: "Play" }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, href: "#", label: "Visitar nuestra página en Instagram", className: "instagram" },
    { icon: <FaFacebook />, href: "#", label: "Visitar nuestra página en Facebook", className: "facebook" },
    { icon: <FaTiktok />, href: "#", label: "Visitar nuestra página en TikTok", className: "tiktok" }
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
            aria-pressed={btn.label === "Carrito" && btn.counter > 0}
          >
            {btn.icon}
            <span>{btn.label}</span>
            {btn.counter > 0 && <span className="cart-counter">{btn.counter}</span>}
          </button>
        ))}
      </div>

      <div className="social-links">
        {socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className={`social-icon ${link.className}`}
            aria-label={link.label}
            title={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
});
