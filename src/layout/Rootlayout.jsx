import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../pages/ThemeContext';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';
import themeToggleSvg from '../assets/moon-bordered.svg';

const RootLayout = () => {
	const [selectedRegion, setSelectedRegion] = useState('');
	const [themeText, setThemeText] = useState('Dark Mode'); // State for theme text
	const navigate = useNavigate();
	const { isDarkTheme, toggleTheme } = useTheme();

	const handleRegionChange = (region) => {
		setSelectedRegion(region);
	};

	useEffect(() => {
		// Update the URL when the selected region changes
		navigate(selectedRegion ? `/region/${selectedRegion}` : '/');
	}, [selectedRegion, navigate]);

	const location = useLocation();
	const regionFromURL = location.pathname.split('/')[2];

	const handleThemeToggle = () => {
		toggleTheme();
		// Update theme text based on the current theme
		setThemeText(isDarkTheme ? 'Dark Mode' : 'Light Mode');
	};

	return (
		<div className={`root-layout ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
			<header>
				<nav className="navbar">
					<NavLink className="h2-flagApp" to="/">
						Countries
					</NavLink>
					<img className="logo" src={isDarkTheme ? logoDark : logoLight} alt="Techover" />
					<div className="nav-links" onClick={handleThemeToggle}>
						<img src={themeToggleSvg} alt="Toggle Theme" className="theme-toggle" />
						<p>{themeText}</p>
					</div>
				</nav>
			</header>
			<main>
				<Outlet selectedRegion={selectedRegion} />
			</main>
		</div>
	);
};

export default RootLayout;
