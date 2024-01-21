// CountryDetails.jsx
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountryDetailsCard from "../components/CountryDetailsCard";


const CountryDetails = () => {
  const navigate = useNavigate();
  const countryArr = useLoaderData();

  if (countryArr.length > 0) {
    const country = countryArr[0];

    return (
      <>
        <CountryDetailsCard country={country} />
      </>
    );
  }
};

export const countryDetailsLoader = async ({ params }) => {
  try {
    const { name } = params;
    console.log("country name:", name);
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${name}`
    );

    if (!res.ok) {
      throw new Error(`Couldn't load the country: ${name}.`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default CountryDetails;
