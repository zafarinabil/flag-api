import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleThemeToggle, themeText, logoSrc, themeToggleSvg }) => {
	return (
		<nav>
			<div className="nav">
				<div className="navbar">
					<NavLink className="h2-flagApp" to="/">
						The Earth
					</NavLink>
					<img className="logo" src={logoSrc} alt="Techover" />
					<div className="nav-links" onClick={handleThemeToggle}>
						<img src={themeToggleSvg} alt="Toggle Theme" className="theme-toggle" />
						<p>{themeText}</p>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
