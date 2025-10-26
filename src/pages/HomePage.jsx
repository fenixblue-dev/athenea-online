// src/pages/HomePage.jsx (Código Corregido y Fusionado)

import React, { useState, useEffect } from 'react';
// Importa ProductCard, ya que ahora lo renderizará directamente
import ProductCard from '../components/Products/ProductCard'; 
import { getAllProducts, productsLocal } from '../data/products';  // Cambiar esta línea
import { useCart } from '../Context/CartContext';
import { fetchTechProducts } from '../services/productsApi';

const HomePage = ({ searchTerm }) => { 
  // Usa useCart si ya no pasas onAddToCart (como corregimos en App.jsx)
  const { addToCart } = useCart();
  
  // Estado para productos (API o locales)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingAPI, setUsingAPI] = useState(false);
  
  // Cargar productos desde API al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const apiProducts = await fetchTechProducts();
        
        // Combinar productos de API con locales
        // Ajustar IDs de API para evitar conflictos (sumar 1000)
        const apiProductsWithNewIds = apiProducts.map(p => ({
          ...p,
          id: p.id + 1000 // Evitar conflicto de IDs
        }));
        
        const combined = [...productsLocal, ...apiProductsWithNewIds];
        setProducts(combined);
        setUsingAPI(true);
        console.log('✅ Productos combinados:', combined.length, '(Locales:', productsLocal.length, '+ API:', apiProducts.length, ')');
      } catch (error) {
        console.warn('⚠️ API no disponible, usando solo productos locales:', error);
        setProducts(productsLocal);
        setUsingAPI(false);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []); 

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section style={{ textAlign: 'center', padding: '40px' }}>
        <p>Cargando productos...</p>
      </section>
    );
  }

  return (
    <section>
      {/* Indicador de fuente de datos */}
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
        {usingAPI ? `🌐 Mostrando ${products.length} productos (Locales + API)` : `💾 ${products.length} productos locales`}
      </div>
      
      <div className="product-grid"> 
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </section>
  );
};

export default HomePage;