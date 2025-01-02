import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import ApiCall from './components/ApiCall'; // Keep ApiCall component

function App() {
  // Minimal state variables; initialized with default values.
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Function to update the current date and time
  const updateCurrentDateTime = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Format date and time
    setCurrentDateTime(dateTimeString);
  };

  // Fetch weather data once API call is successful
  const handleApiDataRetrieved = (city, temp, condition, high, low, iconCode) => {
    setWeatherData({
      location: city,
      temp: temp,
      condition: condition,
      high: high,
      low: low,
      iconCode: iconCode, // Store the icon code
    });
  };

  // Set up interval to update the date and time
  useEffect(() => {
    updateCurrentDateTime(); // Set the initial value
    const intervalId = setInterval(updateCurrentDateTime, 1000); // Update every second

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
        {/* Fetch the user's location and weather */}
        <ApiCall onApiDataRetrieved={handleApiDataRetrieved} />

        {/* Only render the current weather after it's available */}
        {weatherData && (
          <CurrentWeather
            location={weatherData.location}
            temp={weatherData.temp}
            condition={weatherData.condition}
            high={weatherData.high}
            low={weatherData.low}
            iconCode={weatherData.iconCode} // Pass the icon code to CurrentWeather
          />
        )}
      </main>
    </div>
  );
}

export default App;
