// src/Context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * useAuth tolerante: devuelve un stub y un warning si no hay provider.
 * Esto evita pantallas en blanco durante el desarrollo; igualmente
 * debes envolver la app con <AuthProvider> en main.jsx.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth debe usarse dentro de un AuthProvider');
    return {
      user: null,
      login: async () => ({ success: false, message: 'No hay AuthProvider' }),
      logout: () => {},
      loading: false,
      isAuthenticated: false,
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const validUsers = [
      { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
      { username: 'usuario', password: 'usuario123', role: 'user', name: 'Usuario Demo' }
    ];

    const found = validUsers.find(u => u.username === username && u.password === password);

    if (found) {
      const userData = { username: found.username, name: found.name, role: found.role };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, message: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, login, logout, loading, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};