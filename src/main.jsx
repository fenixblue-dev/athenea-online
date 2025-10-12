// src/main.jsx (Código Corregido)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// 1. IMPORTAR el CartProvider desde la ubicación correcta
import { CartProvider } from './Context/CartContext'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. ENVOLVER App con el CartProvider */}
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>,
);