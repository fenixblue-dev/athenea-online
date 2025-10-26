// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllProducts, searchProducts } from './data/products';
import Header from './components/Common/Header.jsx';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import FooterNav from './components/FooterNav.jsx';
import Carousel from './components/Carousel';
import TechNews from './components/TechNews';
import {productsLocal} from "./data/products";
import CartSidebar from './components/CartSidebar';
import { useCart } from './Context/CartContext';
import { fetchTechProducts } from './services/productsApi';
import './styles/App.css';
import './styles/components.css';
import './styles/signup-form.css';
import SignupForm from './components/SignupForm';
import ProductDetailView from './components/Products/ProductDetailView';
import SocialSidebar from './components/SocialSidebar';
import './styles/SocialSidebar.css'; 


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchTechProducts();
        const combined = [...apiProducts, ...productsLocal];
        setAllProducts(combined);
        setFilteredProducts(combined);
      } catch (error) {
        console.error("Error al cargar productos, usando solo locales:", error);
        setAllProducts(productsLocal);
        setFilteredProducts(productsLocal);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = searchProducts(searchTerm);
      setFilteredProducts(results);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchTerm, allProducts]);

  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="app" style={{ minHeight: '100vh', paddingBottom: '70px' }}>
      <SocialSidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
          <PrivateRoute requiredRole="admin">
            <AdminPanel />
          </PrivateRoute>
        } />
        
        <Route path="/" element={
          <>
            <Header 
              onSearch={setSearchTerm} 
              products={allProducts}
              onCartClick={() => setIsCartOpen(true)}
              cartItemCount={cart.length}
            />
            <main>
              <Carousel />
              <HomePage products={filteredProducts} searchTerm={searchTerm} />
              <SignupForm />
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
            <FooterNav 
  onOpenCart={() => setIsCartOpen(true)} 
  cart={cart}
  onNavigateHome={() => window.location.href = '/'} 
/>
          </>
        } />
        
        <Route path="/producto/:id" element={<ProductDetailView products={allProducts} />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;







