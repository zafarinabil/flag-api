// App.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';

// Pages
import Countries, { countriesLoader } from './pages/Countries';
import CountryDetails, { countryDetailsLoader } from './pages/CountryDetails';

// Layouts
import RootLayout from './layout/Rootlayout';

import { ThemeProvider } from './components/ThemeContext';

const routesFromElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<Countries />} loader={countriesLoader} />
    <Route path=":name" element={<CountryDetails />} loader={countryDetailsLoader} />
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
