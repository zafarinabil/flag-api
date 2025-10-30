import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Countries.css';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import loadingGif from '../assets/loading.gif';

const Countries = () => {
  const allCountries = useLoaderData();
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearch = (query) => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    const filtered = region
      ? allCountries.filter((country) => country.region === region)
      : allCountries;
    setFilteredCountries(filtered);
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setFilteredCountries(allCountries);
  };

  const sortedCountries = filteredCountries
    .slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className="home-container">
      <div className="filters-container">
        <SearchBar onSearch={handleSearch} onClear={clearFilters} />
        <RegionFilter selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
      </div>
      <div className="countries-container">
        {sortedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export const countriesLoader = async () => {
  try {
    const res = await fetch('/data.json');
    if (!res.ok) throw new Error('Unable to load local countries data.');
    return await res.json();
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

export default Countries;