// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Common/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import FooterNav from './components/FooterNav.jsx';
import Carousel from './components/Carousel';
import TechNews from './components/TechNews';
import { products as localProducts } from "./data/products";
import CartSidebar from './components/CartSidebar';
import { useCart } from './Context/CartContext';
import { fetchTechProducts } from './services/productsApi';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [allProducts, setAllProducts] = useState(localProducts);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchTechProducts();
        const combined = [...apiProducts, ...localProducts];
        setAllProducts(combined);
      } catch (error) {
        setAllProducts(localProducts);
      }
    };
    loadProducts();
  }, []);

  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="app" style={{ minHeight: '100vh', paddingBottom: '70px' }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
          <PrivateRoute requiredRole="admin">
            <AdminPanel />
          </PrivateRoute>
        } />
        
        <Route path="/" element={
          <>
            <Header onSearch={setSearchTerm} products={allProducts} />
            <main>
              <Carousel />
              <HomePage searchTerm={searchTerm} />
              <TechNews />
            </main>
            <CartSidebar
              cart={cart}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
              onClear={clearCart}
            />
            <FooterNav onOpenCart={() => setIsCartOpen(true)} />
          </>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;