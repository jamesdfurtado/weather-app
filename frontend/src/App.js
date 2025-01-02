import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import ApiCall from './components/ApiCall';
import SearchBar from './components/SearchBar';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [cityQuery, setCityQuery] = useState("");
  const [error, setError] = useState(null); // Add error state here

  const updateCurrentDateTime = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    setCurrentDateTime(dateTimeString);
  };

  const handleApiDataRetrieved = (city, temp, condition, high, low, iconCode) => {
    setWeatherData({ location: city, temp, condition, high, low, iconCode });
  };

  const handleSearch = (city) => {
    setCityQuery(city); // Update city query for ApiCall
  };

  useEffect(() => {
    updateCurrentDateTime();
    const intervalId = setInterval(updateCurrentDateTime, 1000);
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
        <SearchBar onSearch={handleSearch} />
        <ApiCall 
          onApiDataRetrieved={handleApiDataRetrieved} 
          cityQuery={cityQuery} 
          setError={setError} // Pass error handler to ApiCall
        />
        {error && <p className="error-message">{error}</p>} {/* Display error under SearchBar */}
        {weatherData && (
          <CurrentWeather
            location={weatherData.location}
            temp={weatherData.temp}
            condition={weatherData.condition}
            high={weatherData.high}
            low={weatherData.low}
            iconCode={weatherData.iconCode}
          />
        )}
      </main>
    </div>
  );
}

export default App;
