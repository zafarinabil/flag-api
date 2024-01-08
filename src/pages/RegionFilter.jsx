import React from 'react';

const RegionFilter = ({ selectedRegion, regionFromURL, onRegionChange }) => {
  return (
    <div className="region-filter">
      <label htmlFor="region" className="filter-label"></label>
      <select
        id="region"
        value={selectedRegion || regionFromURL || ''}
        onChange={(e) => onRegionChange(e.target.value)}
        className="custom-dropdown"
      >
        <option value="" className="default-option">
          All Regions
        </option>
        <option value="America"> 🌎 America</option>
        <option value="Asia"> 🌏 Asia</option>
        <option value="Europe"> 🌍 Europe</option>
        <option value="Africa"> 🌍 Africa</option>
        <option value="Oceania"> 🌍 Oceania</option>
      </select>
    </div>
  );
};

export default RegionFilter;
