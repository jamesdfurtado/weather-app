import React, { useState, useEffect } from 'react';

function ApiCall({ onApiDataRetrieved }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const apiKey = "df8d0bb7c93415bde0e26eff0f02a823"; // Replace with your OpenWeatherMap API key
        
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
        const iconCode = weatherData.weather[0].icon; // Get the icon code

        // Pass the weather and city data back to App.js
        onApiDataRetrieved(city, temp, condition, high, low, iconCode); // Include the icon code
      } catch (err) {
        setError("Error fetching weather data");
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          () => setError("Unable to retrieve your location")
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    };

    getLocation();
  }, [onApiDataRetrieved]);

  return (
    <div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ApiCall;
