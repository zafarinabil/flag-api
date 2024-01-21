// CountryDetailsCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CountryDetailsCard.css';
import arrow from '../assets/arrow.png';

const CountryDetailsCard = ({ country }) => {
	const { name, nativeName, flags, population, region, capital, languages, currencies, borders } = country;

	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate('/');
	};

	const handleBorderCountryClick = (border) => {
		// Navigate to the border country when clicked
		navigate(`/${border}`);
	};

	return (
		<div className="country-details-container">
			<div className="country-details-flag-container">
				<div className="back-button" onClick={handleGoBack}>
					<img className="back-button-img" src={arrow} alt="Back" />
					<p className="back-button-text"> Back</p>
				</div>
				<div className="country-details-flag-frame">
					<img className="country-details-flag" src={flags.svg} alt="" />
				</div>
			</div>

			<div className="country-details-information">
				<div id="information-container">
					<div id="information-one">
						<h2>{name.common}</h2>
						<p>
							<strong>Native Name:</strong> {name.common}
						</p>{' '}
						{/* Display nativeName */}
						<p>
							<strong>Population:</strong> {population.toLocaleString('en-US')}
						</p>
						<p>
							<strong>Region:</strong> {region}
						</p>
						<p>
							<strong>Capital:</strong> {capital}
						</p>
					</div>
					<div id="information-two">
						<p>
							<strong>Languages:</strong> {languages ? Object.values(languages).join(', ') : 'N/A'}
						</p>
						<p>
							<strong>Currencies:</strong> {currencies ? Object.keys(currencies).join(', ') : 'N/A'}
						</p>
					</div>
				</div>
				<div className="border-countries-container">
					<strong>Border Countries:</strong>
					<div>
						{' '}
						{borders && borders.length > 0 ? (
							borders.map((border, index) => (
								<button
									key={index}
									className="border-country"
									onClick={() => handleBorderCountryClick(border)}
								>
									{border}
								</button>
							))
						) : (
							<span>N/A</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CountryDetailsCard;
