// RegionFilter.jsx
import React from 'react';
import './RegionFilter.css';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const regions = [
    { value: '', label: 'All Regions' },
    { value: 'Americas', label: '🌎 Americas' },
    { value: 'Asia', label: '🌏 Asia' },
    { value: 'Europe', label: '🌍 Europe' },
    { value: 'Africa', label: '🌍 Africa' },
    { value: 'Oceania', label: '🌍 Oceania' },
  ];

  return (
    <div className="region-filter">
      <select
        id="region"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="custom-dropdown"
      >
        {regions.map((region) => (
          <option key={region.value} value={region.value} className="default-option">
            {region.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
