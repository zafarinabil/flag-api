// RootLayout.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <nav className="navbar">
        <NavLink className="h2-flagApp" to="/">The Flag App</NavLink>
          <img className="logo" src={logo} alt="Techover" />
          <div className="nav-links">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button type="button">Search</button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
