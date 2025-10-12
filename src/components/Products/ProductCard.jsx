//// src/components/Products/ProductCard.jsx

import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import "../../styles/ProductCard.css";
import { useCart } from '../../Context/CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const quantity = 1; 
    addToCart(product, quantity, selectedColor); 

    setAdded(true);
    setTimeout(() => setAdded(false), 1200); 
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

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

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>${product.price.toFixed(2)}</p>

          {/* CONTROLES DE COLOR */}
          <div className="color-selector">
        <span className="color-label">Color:</span>
        {product.colors.map(color => (
          <button
            key={color}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            onClick={() => handleColorChange(color)}
          >
            {getColorName(color)}
          </button>
        ))}
      </div>
      
      {/* BOTÓN AÑADIR AL CARRITO */}
      <button 
        className={`add-to-cart-btn ${added ? 'added' : ''}`} 
        onClick={handleAddToCart}
      >
        <FaShoppingCart /> {added ? '¡Agregado!' : 'Añadir al Carrito'}
      </button>
    </div>
  );
};

export default ProductCard;

