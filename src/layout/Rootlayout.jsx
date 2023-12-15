// RootLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-light.png';

const RootLayout = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();

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
    <div className="root-layout">
      <header>
        <nav className="navbar">
          <NavLink className="h2-flagApp" to="/">
            The Flag App
          </NavLink>
          <img className="logo" src={logo} alt="Techover" />
          <div className="nav-links">

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
