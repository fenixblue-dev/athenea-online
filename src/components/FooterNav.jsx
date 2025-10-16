import { FaHome, FaHeart, FaShoppingCart, FaPlay, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "../styles/FooterNav.css";

export default function FooterNav({ onOpenCart, cart = [] }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <footer className="footer-nav">
      <div className="nav-buttons-wrapper">
        <button className="nav-btn" onClick={() => window.location.href = '/'}><FaHome /><span>Inicio</span></button>
        <button className="nav-btn"><FaHeart /><span>Favoritos</span></button>
        <button className="nav-btn cart-btn" onClick={onOpenCart}>
          <FaShoppingCart />
          <span>Carrito</span>
          {totalItems > 0 && (
            <span className="cart-counter">{totalItems}</span>
          )}
        </button>
        <button className="nav-btn"><FaPlay /><span>Play</span></button>
      </div>

      <div className="social-links">
        <a href="#" className="social-icon"><FaInstagram /></a>
        <a href="#" className="social-icon"><FaFacebook /></a>
        <a href="#" className="social-icon"><FaTiktok /></a>
      </div>
    </footer>
  );
}