import React, { useState, useEffect } from 'react';

function ApiCall({ onApiDataRetrieved, cityQuery }) {
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(null); // Clear any previous errors
      const apiKey = "df8d0bb7c93415bde0e26eff0f02a823";

      // Fetch city name
      const cityResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
      );
      if (!cityResponse.ok) throw new Error("Failed to fetch city name");

      const cityData = await cityResponse.json();
      const city = cityData && cityData[0] ? cityData[0].name : "Unknown City";

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
      );
      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");

      const weatherData = await weatherResponse.json();

      // Round the temperature values to remove decimal points
      const temp = Math.round(weatherData.main.temp);
      const condition = weatherData.weather[0].description;
      const high = Math.round(weatherData.main.temp_max);
      const low = Math.round(weatherData.main.temp_min);
      const iconCode = weatherData.weather[0].icon;

      // Pass the weather and city data back to App.js
      onApiDataRetrieved(city, temp, condition, high, low, iconCode);
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setError(null); // Clear any previous errors
      const apiKey = "df8d0bb7c93415bde0e26eff0f02a823";

      // Fetch city coordinates
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      if (!geoResponse.ok) throw new Error("Failed to fetch city coordinates");

      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("City not found");

      const { lat, lon } = geoData[0];
      fetchWeatherData(lat, lon);
    } catch (err) {
      setError(err.message || "City not found"); // Show specific error
    }
  };

  useEffect(() => {
    let ignore = false; // To prevent state updates if component unmounts

    if (cityQuery) {
      fetchWeatherByCity(cityQuery).catch((err) => {
        if (!ignore) setError(err.message);
      });
    } else {
      if (navigator.geolocation) {
        setError(null); // Clear any previous errors
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          () => {
            if (!ignore) setError("Unable to retrieve your location");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    }

    return () => {
      ignore = true; // Prevent state updates after component unmount
    };
  }, [cityQuery]);

  return <div>{error && <p className="error-message">{error}</p>}</div>;
}

export default ApiCall;
