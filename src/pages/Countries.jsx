import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import './Countries.css';
import CountryCard from './CountryCard';

const Countries = () => {
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
        <RegionFilter
          selectedRegion={selectedRegion}
          regionFromURL={regionFromURL}
          onRegionChange={setSelectedRegion}
        />
      </div>
      <main>
        <div className="countries">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.cca2}
                country={country}
                handleCountryClick={handleCountryClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export const CountriesLoader = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};

export default Countries;
