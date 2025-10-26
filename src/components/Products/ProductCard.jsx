
import React, { useState, Suspense } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';
import "../../styles/ProductCard.css";

const ProductDetailViewLazy = React.lazy(() => import('./ProductDetailView'));

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleAddToCart = () => {
    const quantity = 1; 
    addToCart(product, quantity, selectedColor); 
    setAdded(true);
    setTimeout(() => setAdded(false), 1200); 
  };

  const handleColorChange = (color) => setSelectedColor(color);
  const handleProductClick = () => setShowDetail(true);

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
    <>
      <div className="product-card">
        {/* IMAGEN */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"           // Lazy loading
          onClick={handleProductClick}
          style={{ cursor: 'pointer' }}
        />

        {/* NOMBRE PRODUCTO */}
        <h3>
          <a
            href={`/product/${product.id}`}           // SEO-friendly link
            title={`Ver detalles de ${product.name}`}
            onClick={(e) => { e.preventDefault(); handleProductClick(); }}
          >
            {product.name}
          </a>
        </h3>

        {/* PRECIO */}
        <p>${product.price.toFixed(2)}</p>

        {/* SELECCIÓN DE COLOR */}
        <div className="color-selector">
          <span className="color-label">Color:</span>
          {product.colors.map(color => (
            <button
              key={color}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => handleColorChange(color)}
              aria-label={`Seleccionar color ${getColorName(color)}${selectedColor === color ? ', actualmente seleccionado' : ''}`}
              aria-pressed={selectedColor === color}
            >
              {getColorName(color)}
            </button>
          ))}
        </div>

        {/* BOTÓN CARRITO */}
        <button 
          className={`add-to-cart-btn ${added ? 'added' : ''}`} 
          onClick={handleAddToCart}
          aria-label={added ? 'Producto agregado al carrito' : 'Agregar producto al carrito'}
          title={added ? 'Producto agregado al carrito' : 'Agregar producto al carrito'}
          aria-pressed={added}
        >
          <FaShoppingCart /> {added ? '¡Agregado!' : 'Añadir al Carrito'}
        </button>
      </div>

      {/* VISTA DETALLADA DEL PRODUCTO */}
      {showDetail && (
        <Suspense fallback={<div>Cargando...</div>}>
          <ProductDetailViewLazy
            product={product}
            selectedColor={selectedColor}
            onClose={() => setShowDetail(false)}
            onAddToCart={handleAddToCart}
            onColorChange={handleColorChange}
          />
        </Suspense>
      )}
    </>
  );
};

// Memoización para mejorar rendimiento
export default React.memo(ProductCard);

