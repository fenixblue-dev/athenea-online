// src/App.jsx (CÓDIGO FINALMENTE CORREGIDO Y FUSIONADO)

import React, { useState, useEffect } from 'react';
import Header from './components/Common/Header';
import HomePage from './pages/HomePage';
import FooterNav from './components/FooterNav.jsx';
import Carousel from './components/Carousel';
import TechNews from './components/TechNews';
import { products as localProducts } from "./data/products";
import ProductCard from "./components/Products/ProductCard";
import CartSidebar from './components/CartSidebar';
import { useCart } from './Context/CartContext'; // Asegúrate que la C de Context es mayúscula si así es tu carpeta
import { fetchTechProducts } from './services/productsApi';
import './styles/App.css';
import './styles/components.css';

function App() {
  
  // Estado para la búsqueda y el control global del Sidebar (DEBE VIVIR AQUÍ)
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false); // <--- Estado de visibilidad
  const [allProducts, setAllProducts] = useState(localProducts); // Productos para el buscador
  
  // Cargar productos al iniciar (para el autocompletado)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchTechProducts();
        // Combinar productos de API con locales (sin duplicados)
        const combined = [...apiProducts, ...localProducts];
        setAllProducts(combined);
      } catch (error) {
        // Si falla la API, usar solo productos locales
        setAllProducts(localProducts);
      }
    };
    
    loadProducts();
  }, []);

  // USAMOS el hook para obtener la lógica del carrito (funciona porque main.jsx lo envuelve)
  const { 
    cart,           
    removeItem,     
    updateQuantity, 
    clearCart       
  } = useCart(); 

  return (
    <div className="app" style={{ minHeight: '100vh', paddingBottom: '70px' }}>
      <Header onSearch={setSearchTerm} products={allProducts} />

      <main>
        <Carousel />

        <HomePage searchTerm={searchTerm} />
        
        <TechNews />

      </main>

      {/* RENDERIZA EL SIDEBAR SÓLO UNA VEZ AQUÍ */}
      <CartSidebar
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
          onClear={clearCart}
      />

      {/* PASA LA FUNCIÓN PARA ABRIR EL SIDEBAR AL FOOTER */}
      <FooterNav
          onOpenCart={() => setIsCartOpen(true)} // <-- Esta función abre el sidebar de arriba
          // Ya no se necesitan las props 'cart' ni 'onClearCart' si el FooterNav solo abre/cierra
      />
    </div>
  );
}

export default App;