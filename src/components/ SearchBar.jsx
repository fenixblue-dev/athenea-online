import React from 'react';
import '../styles/App.css';

const SearchBar = () => {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Buscar en Ateneo Online" 
        className="search-input" 
      />
    </div>
  );
};

export default SearchBar;