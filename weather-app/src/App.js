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

  // Fetch real weather data from an API (to be implemented later)
  useEffect(() => {
    // Code to fetch data (e.g., OpenWeather API) goes here
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <h3>Get the latest weather updates for your location.</h3>
        <p>Created by James Furtado</p>
      </header>

      <main>
        {/* Current Weather */}
        <CurrentWeather
          location={currentLocation}
          temp={currentTemp}
          condition={currentCondition}
          high={currentHigh}
          low={currentLow}
        />

        <hr />

        {/* Hourly Forecast */}
        <HourlyForecast placeholderTemp={placeholderTemp} />

        <hr />

        {/* 5-Day Forecast */}
        <FiveDayForecast forecastData={forecastData} />
      </main>
    </div>
  );
}

export default App;
