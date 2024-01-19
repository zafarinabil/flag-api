import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Invoke onSearch whenever the input changes
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a Country"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
