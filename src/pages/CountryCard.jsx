import React from 'react';

const CountryCard = ({ country, handleCountryClick }) => {
  return (
    <div className="countries-card" onClick={() => handleCountryClick(country)}>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag" />
      <div className="country-detail">
        <h2>{country.name.common}</h2>
        <p> <strong> Population:</strong> {country.population}</p>
        <p> <strong> Region:</strong> {country.region}</p>
        <p> <strong> Capital:</strong> {country.capital}</p>
      </div>
    </div>
  );
};

export default CountryCard;
