import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Countries.css';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import loadingGif from '../assets/loading.gif';

const Countries = () => {
  const [loading, setLoading] = useState(true);
  const allCountries = useLoaderData();
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionFromURL, setRegionFromURL] = useState('');

  const handleSearch = (searchQuery) => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);

    // Filter countries based on the selected region
    const filtered = region ? allCountries.filter((country) => country.region === region) : allCountries;
    setFilteredCountries(filtered);
  };

  const clearFilters = () => {
    setSelectedRegion('');
  };

  // Sort countries alphabetically by their common names
  const sortedCountries = filteredCountries.slice().sort((a, b) => a.name.common.localeCompare(b.name.common));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) {
          throw new Error('Unable to fetch countries.');
        }
        const data = await res.json();
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  if (loading) {
    return (
      <div className="home-container">
        <div className='loading-container'>
          <img className='loading-gif' src={loadingGif} alt="loading" />
        </div>
      </div>
    );
  }

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
  const res = await fetch('https://restcountries.com/v3.1/all');
  if (!res.ok) {
    throw new Error('Unable to fetch countries.');
  }
  return res.json();
};

export default Countries;
