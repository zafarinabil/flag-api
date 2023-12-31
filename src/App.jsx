import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';

// Pages
import Countries, { CountriesLoader } from './pages/Countries';
import CountryDetails from './pages/CountryDetails';

// Layouts
import RootLayout from './layout/Rootlayout';

import { ThemeProvider } from './pages/ThemeContext';

const routesFromElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Countries />} loader={CountriesLoader} />
    <Route path="/region/:region" element={<Countries />} loader={CountriesLoader} />
    <Route path="/countries/:code" element={<CountryDetails />} />
  </Route>
);

const router = createBrowserRouter(routesFromElements);

function App() {
  return (
    <div className="App">
      {/* Wrap your entire app with the ThemeProvider */}
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
