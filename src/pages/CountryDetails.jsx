import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../pages/ThemeContext';
import arrowLeftDark from '../assets/arrow-left-dark.svg';
import arrowLeft from '../assets/arrow-left.svg';
import './CountryDetails.css';

const CountryDetails = () => {
	const { code } = useParams();
	const [country, setCountry] = useState(null);
	const [borderCountries, setBorderCountries] = useState([]);
	const { isDarkTheme } = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCountryDetails = async () => {
			if (!code) {
				return;
			}

			try {
				// Fetch country details using the /alpha endpoint
				const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
				setCountry(response.data[0]);

				// Get bordering countries from the fetched country details
				const borders = response.data[0].borders || [];

				// Fetch full details of bordering countries
				const borderCountriesDetails = await Promise.all(
					borders.map(async (borderCode) => {
						const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`);
						return borderResponse.data[0];
					})
				);

				// Set border countries details
				setBorderCountries(borderCountriesDetails);
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

	const handleGoToIndex = () => {
		navigate('/');
	};

	const handleBorderCountryClick = (borderCountryCode) => {
		// Navigate to the details page of the clicked bordering country
		navigate(`/countries/${borderCountryCode}`);
	};

	return (
		<div
			className={`country-details-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
			style={{ overflowY: 'hidden' }}
		>
			<div onClick={handleGoToIndex} className="back-button">
				<img src={isDarkTheme ? arrowLeft : arrowLeftDark} alt="Back" />
				<p> Back</p>
			</div>
			<div className="country-details-card">
				<img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag-details" />
				<div className="country-details-text">
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
				<div className="country-details-text" id="two">
					<p>
						<strong>Currencies:</strong> {Object.keys(country.currencies).join(', ') || 'N/A'}
					</p>
					<p>
						<strong>Languages:</strong> {Object.values(country.languages).join(', ') || 'N/A'}
					</p>
				</div>
			</div>
			<div className="border">
				<p>
					<p>
						<strong>Border Countries:</strong>
					</p>
					{borderCountries.length > 0
						? borderCountries.map((borderCountry) => (
								<button
									className="border-button"
									key={borderCountry.cca3}
									onClick={() => handleBorderCountryClick(borderCountry.cca3)}
								>
									{borderCountry.name.common}
								</button>
						  ))
						: 'None'}
				</p>
			</div>
		</div>
	);
};

export default CountryDetails;
