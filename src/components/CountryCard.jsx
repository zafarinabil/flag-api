// CountryCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  return (
    <Link className="countries-card" to={`/${country.cca3}`} key={country.cca3}>
      <div className="countries-flag-frame">
        <img className="flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
      <div className="countries-detail">
        <h2>{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital}</p>
      </div>
    </Link>
  );
};

export default CountryCard;
