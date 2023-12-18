import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../pages/ThemeContext'; // Import useTheme from ThemeContext.js
import arrowLeftDark from '../assets/arrow-left-dark.svg';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const { isDarkTheme } = useTheme(); // Use theme-related state from ThemeContext.js
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (!code) {
        return;
      }

      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [code]);

  if (!country) {
    return (
      <div className={`country-details-loading ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>Loading...</div>
    );
  }

  // Log the entire country object to the console for inspection
  console.log('Country Object:', country);

  const handleGoToIndex = () => {
    navigate('/'); // Navigate to the index page
  };

  return (
    <div className={`country-details-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      
	  <div onClick={handleGoToIndex} className='back-button'>
		<img src={arrowLeftDark}></img>
		<p> Back</p>
	  </div>
      <div className="country-details-card">
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag-details" />
        <div className='country-details-text'>
          <h1>{country.name.common}</h1>
          <p>
            <strong>Official Name:</strong> {country.name.official}
          </p>
          <p>
            <strong>Population:</strong> {country.population}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
        </div>
        <div className='country-details-text' id='two'>
          <p>
            <strong>Currencies:</strong> {Object.keys(country.currencies).join(', ') || 'N/A'}
          </p>
          <p>
            <strong>Languages:</strong> {Object.values(country.languages).join(', ') || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
