// RootLayout.js
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../pages/ThemeContext';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';
import themeToggleSvg from '../assets/theme.png';

const RootLayout = () => {
	const [selectedRegion, setSelectedRegion] = useState('');
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

	return (
		<div className={`root-layout ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
			<header>
				<nav className="navbar">
					<NavLink className="h2-flagApp" to="/">
						The Flag App
					</NavLink>
					<img className="logo" src={isDarkTheme ? logoDark : logoLight} alt="Techover" />
					<div className="nav-links">
						{/* Replace the button with an img for the theme toggle */}
						<img
							src={themeToggleSvg}
							alt="Toggle Theme"
							className="theme-toggle"
							style={{ width: '40px' }}
							onClick={toggleTheme}
						/>
					</div>
				</nav>
			</header>
			<main>
				{/* Pass selectedRegion as a prop to the Outlet */}
				<Outlet selectedRegion={selectedRegion} />
			</main>
		</div>
	);
};

export default RootLayout;
