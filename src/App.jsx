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
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';

// Layouts
import RootLayout from './layout/Rootlayout';

const routesFromElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Countries />} />
    <Route path="/countries/:code" element={<CountryDetails />} />
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
