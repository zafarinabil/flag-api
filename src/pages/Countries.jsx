// Countries.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    // Use navigate to go to the details page with the country's code
    navigate(`/countries/${country.cca2}`);
  };

  return (
    <div className='countries'>
      {countries.map((country) => (
        <div
          className='countries-card'
          key={country.cca2}
          onClick={() => handleCountryClick(country)}
        >
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className='flag' />
          <div className='country-detail'>
            <h2>{country.name.common}</h2>
            {/* <p>Population: {country.population}</p> */}
            <p>Region: {country.region}</p>
            {/* <p>Capital: {country.capital}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countries;
