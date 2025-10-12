import { FaHome, FaHeart, FaShoppingCart, FaPlay, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "../styles/FooterNav.css";

export default function Footer({ onOpenCart }) {
  return (
    <footer className="footer-nav">
      <div className="nav-buttons-wrapper">
        <button className="nav-btn"><FaHome /><span>Inicio</span></button>
        <button className="nav-btn"><FaHeart /><span>Favoritos</span></button>
        <button className="nav-btn" onClick={onOpenCart}><FaShoppingCart /><span>Carrito</span></button>
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