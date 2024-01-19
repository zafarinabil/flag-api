import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import Navbar from '../components/Navbar';
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
        <Navbar
          isDarkTheme={isDarkTheme}
          handleThemeToggle={handleThemeToggle}
          themeText={themeText}
          logoSrc={isDarkTheme ? logoDark : logoLight}
          themeToggleSvg={themeToggleSvg}
        />
      </header>
      <main>
        <Outlet selectedRegion={selectedRegion} />
      </main>
      {/* Footer section */}
      <footer className="footer">
        <p>Nabil Zafari &copy; 2024 The Flag App</p>
      </footer>
    </div>
  );
};

export default RootLayout;
