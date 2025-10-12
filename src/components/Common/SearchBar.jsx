import React, { useState, useRef, useEffect } from 'react';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, products = [] }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);

    if (value.trim().length > 0) {
      // Filtrar productos que coincidan con la búsqueda
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limitar a 5 sugerencias

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchValue(productName);
    onSearch(productName);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="search-bar"
        />
        {searchValue && (
          <button 
            className="search-clear-btn" 
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="search-suggestions">
          {filteredSuggestions.map((product) => (
            <li
              key={product.id}
              className="search-suggestion-item"
              onClick={() => handleSuggestionClick(product.name)}
            >
              <div className="suggestion-content">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="suggestion-image"
                  />
                )}
                <div className="suggestion-text">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-price">
                    ${product.price.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;