import React, { useState, useEffect } from 'react';
import apiKeys from './apiKeys';  // Ensure this file contains your OpenWeatherMap API key

function CurrentLocation({ lat, lon }) {
  const [city, setCity] = useState("Loading...");

  useEffect(() => {
    const fetchCity = async () => {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();
      setCity(data.name); // Extract city name from API response
    };

    if (lat && lon) {
      fetchCity();
    }
  }, [lat, lon]); // Re-run the effect when lat or lon changes

  return <span>{city}</span>;
}

export default CurrentLocation;
