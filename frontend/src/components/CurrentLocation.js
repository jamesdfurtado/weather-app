import React, { useState, useEffect } from 'react';

function CurrentLocation({ onLocationRetrieved }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityName = async (latitude, longitude) => {
      try {
        const apiKey = "df8d0bb7c93415bde0e26eff0f02a823"; // Replace with your OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch city name");
        }

        const data = await response.json();

        if (data && data.length > 0 && data[0].name) {
          onLocationRetrieved(data[0].name); // Pass the city name back to App.js
        } else {
          setError("Unable to retrieve city name");
        }
      } catch (err) {
        setError("Error fetching city name");
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCityName(latitude, longitude);
          },
          () => setError("Unable to retrieve your location")
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    };

    getLocation();
  }, [onLocationRetrieved]);

  return (
    <div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CurrentLocation;
