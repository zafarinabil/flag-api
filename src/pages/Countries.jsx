// Countries.js (without search functionality)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Countries = ({ filteredCountries, loading, handleCountryClick }) => {
	return (
		<div className="countries">
			{loading ? (
				<p>Loading...</p>
			) : (
				filteredCountries.map((country) => (
					<div className="countries-card" key={country.cca2} onClick={() => handleCountryClick(country)}>
						<img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag" />
						<div className="country-detail">
							<h2>{country.name.common}</h2>
							<p>Population: {country.population}</p>
							<p>Region: {country.region}</p>
							<p>Capital : {country.capital}</p>
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
