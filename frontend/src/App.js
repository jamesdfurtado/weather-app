import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';  // Import axios
import CurrentWeather from './components/CurrentWeather';
import ApiCall from './components/ApiCall';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './components/AuthPage';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [cityQuery, setCityQuery] = useState("");
  const [testMessage, setTestMessage] = useState("");  // State for storing test message

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
    // Update time every second
    updateCurrentDateTime();
    const intervalId = setInterval(updateCurrentDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch the test message from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/test')  // Make GET request to backend
      .then(response => {
        setTestMessage(response.data);  // Set the test message from backend
      })
      .catch(error => {
        console.error('There was an error fetching the test message!', error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Weather App</h1>
          <h3>Get the latest weather updates for your location.</h3>
          <p>Created by James Furtado</p>
          <p><strong>Current Date and Time:</strong> {currentDateTime}</p>

          {/* Display the test message here */}
          {testMessage && <p><strong>Backend Test Message:</strong> {testMessage}</p>}

          {/* Sign-up link */}
          <Link to="/auth" className="auth-button">Sign Up / Sign In</Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar onSearch={handleSearch} />
                <ApiCall onApiDataRetrieved={handleApiDataRetrieved} cityQuery={cityQuery} />
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
              </>
            } />
            <Route path="/auth" element={<AuthPage />} /> {/* Route for Auth page */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
