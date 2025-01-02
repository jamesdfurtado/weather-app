import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import FiveDayForecast from './components/FiveDayForecast';

function App() {
  // Current day data
  const [currentLocation, setCurrentLocation] = useState("Boston");
  const [currentTemp, setCurrentTemp] = useState(48);
  const [currentCondition, setCurrentCondition] = useState("Windy");
  const [currentHigh, setCurrentHigh] = useState(51);
  const [currentLow, setCurrentLow] = useState(43);
  const [placeholderTemp, setPlaceholderTemp] = useState(36);

  // Sample 5-day forecast data
  const forecastData = [
    { name: "Today", icon: "/path/to/icon1.png", high: 76, low: 65, condition: "sunny" },
    { name: "Tomorrow", icon: "/path/to/icon2.png", high: 72, low: 60, condition: "cloudy" },
    { name: "Wed", icon: "/path/to/icon3.png", high: 80, low: 68, condition: "rainy" },
    { name: "Thu", icon: "/path/to/icon4.png", high: 78, low: 66, condition: "partly cloudy" },
    { name: "Fri", icon: "/path/to/icon5.png", high: 75, low: 64, condition: "sunny" },
  ];

  // Date and time state
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Function to update the current date and time
  const updateCurrentDateTime = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Format date and time
    setCurrentDateTime(dateTimeString);
  };

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // For now, just set a default message with latitude and longitude
        setCurrentLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      }, (error) => {
        console.log("Error getting location: ", error);
        setCurrentLocation("Unable to retrieve location");
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCurrentLocation("Geolocation not supported");
    }
  };

  // Set up interval to update the date and time
  useEffect(() => {
    updateCurrentDateTime(); // Set the initial value
    const intervalId = setInterval(updateCurrentDateTime, 1000); // Update every second
    getUserLocation(); // Get user's location when component mounts

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <h3>Get the latest weather updates for your location.</h3>
        <p>Created by James Furtado</p>
        <p><strong>Current Date and Time:</strong> {currentDateTime}</p>
      </header>

      <main>
        {/* Current Weather */}
        <CurrentWeather
          location={currentLocation}
          temp={currentTemp}
          condition={currentCondition}
          high={currentHigh}
          low={currentLow}
          currentDateTime={currentDateTime} // Pass the current date and time
        />

        <hr />

        {/* Hourly Forecast */}
        <HourlyForecast
          placeholderTemp={placeholderTemp}
          currentDateTime={currentDateTime} // Pass the current date and time
        />

        <hr />

        {/* 5-Day Forecast */}
        <FiveDayForecast
          forecastData={forecastData} // Pass the sample forecast data
          currentDateTime={currentDateTime} // Pass the current date and time
        />
      </main>
    </div>
  );
}

export default App;
