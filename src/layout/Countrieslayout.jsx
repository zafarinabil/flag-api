// CountriesLayout.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../pages/SearchBar';
import Countries from '../pages/Countries';

const CountriesLayout = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const url = selectedRegion
          ? `https://restcountries.com/v3.1/region/${selectedRegion}`
          : 'https://restcountries.com/v3.1/all';
        const response = await axios.get(url);
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  const handleCountryClick = (country) => {
    navigate(`/countries/${country.cca2}`);
  };

  const handleSearch = (searchQuery) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const location = useLocation();
  const regionFromURL = location.pathname.split('/')[2];

  useEffect(() => {
    // Update the URL when the selected region changes
    navigate(selectedRegion ? `/region/${selectedRegion}` : '/');
  }, [selectedRegion, navigate]);

  // Add the following useEffect to handle the case when the user selects "All Regions"
  useEffect(() => {
    if (!regionFromURL && !selectedRegion) {
      // User has selected "All Regions"
      navigate('/');
    }
  }, [regionFromURL, selectedRegion, navigate]);

  return (
    <div className="countries-layout">
      <div className="countries-layout-container">
        <SearchBar onSearch={handleSearch} />
        <div className="region-filter">
          <label htmlFor="region" className="filter-label"></label>
          <select
            id="region"
            value={selectedRegion || regionFromURL || ''}
            onChange={(e) => setSelectedRegion(e.target.value)}
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
      </div>
      <main>
        {/* Pass relevant props to the Countries component */}
        <Countries
          filteredCountries={filteredCountries}
          loading={loading}
          handleCountryClick={handleCountryClick}
        />
      </main>
    </div>
  );
};

export default CountriesLayout;
