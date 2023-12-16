import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '../pages/ThemeContext'; // Import useTheme from ThemeContext.js

const CountryDetails = () => {
	const { code } = useParams();
	const [country, setCountry] = useState(null);
	const { isDarkTheme } = useTheme(); // Use theme-related state from ThemeContext.js

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

	return (
		<div className={`country-details-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
			<div className="country-details-card">
				<img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag-details" />
				<h2>{country.name.common}</h2>
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
					<strong>Subregion:</strong> {country.subregion}
				</p>
				<p>
					<strong>Capital:</strong> {country.capital}
				</p>
			</div>
		</div>
	);
};

export default CountryDetails;
