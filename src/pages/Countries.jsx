import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country) => {
    // Use navigate to go to the details page with the country's code
    navigate(`/countries/${country.cca2}`);
  };

  return (
    <div className='countries'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        countries.map((country) => (
          <div
            className='countries-card'
            key={country.cca2}
            onClick={() => handleCountryClick(country)}
          >
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className='flag' />
            <div className='country-detail'>
              <h2>{country.name.common}</h2>
              <p>Region: {country.region}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const CountriesLoader = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};

export default Countries;
