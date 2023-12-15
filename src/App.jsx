// App.js
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';

// Pages
import Countries, { CountriesLoader } from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import SearchBar from './pages/SearchBar';

// Layouts
import RootLayout from './layout/Rootlayout';
import CountriesLayout from './layout/Countrieslayout';

const routesFromElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
        <Route path="/countries/:code" element={<CountryDetails />} />

    <Route path='/' element={<CountriesLayout/>}>
      <Route index element={<Countries/>} loader={CountriesLoader}/>
      <Route path="/region/:region" element={<Countries />} loader={CountriesLoader} />
    </Route>
  </Route>

);

const router = createBrowserRouter(routesFromElements);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
