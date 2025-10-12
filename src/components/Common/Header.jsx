import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <h1>Athenea Online</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;