import React from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';
import '../../styles/ProductDetailView.css';

const ProductDetailView = ({ product, selectedColor, onClose, onAddToCart, onColorChange }) => {
  const { addToCart } = useCart();

  // Función para obtener el nombre del color en español
  const getColorName = (color) => {
    const colorNames = {
      'red': 'Rojo',
      'blue': 'Azul',
      'green': 'Verde',
      'black': 'Negro',
      'white': 'Blanco',
      'yellow': 'Amarillo',
      'pink': 'Rosa',
      'purple': 'Morado',
      'orange': 'Naranja',
      'gray': 'Gris',
      'brown': 'Marrón'
    };
    return colorNames[color.toLowerCase()] || color;
  };

  const handleAddToCartClick = () => {
    onAddToCart();
    onClose(); // Cerrar el modal después de agregar
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>

            {/* CONTROLES DE COLOR */}
            <div className="color-selector-detail">
              <span className="color-label">Color:</span>
              <div className="color-options-detail">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option-detail ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => onColorChange(color)}
                  >
                    {getColorName(color)}
                  </button>
                ))}
              </div>
            </div>

            <button className="add-to-cart-detail" onClick={handleAddToCartClick}>
              <FaShoppingCart /> Añadir al Carrito - ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;