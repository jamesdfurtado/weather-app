import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import ApiCall from './components/ApiCall';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import SavedLocations from './components/SavedLocations';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [cityQuery, setCityQuery] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [savedLocationsChanged, setSavedLocationsChanged] = useState(false);

  const updateCurrentDateTime = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    setCurrentDateTime(dateTimeString);
  };

  const handleApiDataRetrieved = (city, temp, condition, high, low, iconCode) => {
    setWeatherData({ location: city, temp, condition, high, low, iconCode });
  };

  const handleSearch = (city) => {
    setCityQuery(city);
  };

  const handleSaveLocation = () => {
    if (username === "Guest" || !weatherData) return;

    axios.post('http://localhost:8080/api/locations/save', {
      username: username,
      location: weatherData.location,
    })
      .then(response => {
        console.log('Location saved:', response.data);
        setSavedLocationsChanged(!savedLocationsChanged);
      })
      .catch(error => {
        console.error('Error saving location:', error);
      });
  };

  useEffect(() => {
    updateCurrentDateTime();
    const intervalId = setInterval(updateCurrentDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Weather App</h1>
          <p>Created by James Furtado</p>
          <p className="date-time">{currentDateTime}</p>

          <div className="username-container">
            {username}
          </div>

          {username !== "Guest" && (
            <button className="sign-out-button" onClick={() => setUsername("Guest")}>
              Sign Out
            </button>
          )}

          <div className="auth-container">
            <Link to="/auth" className="auth-button">Sign Up / Sign In</Link>
            <p className="auth-info">Sign up to save location preferences!</p>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar onSearch={handleSearch} />
                <ApiCall onApiDataRetrieved={handleApiDataRetrieved} cityQuery={cityQuery} />
                {weatherData && (
                  <div className="weather-container">
                    <CurrentWeather
                      location={weatherData.location}
                      temp={weatherData.temp}
                      condition={weatherData.condition}
                      high={weatherData.high}
                      low={weatherData.low}
                      iconCode={weatherData.iconCode}
                    />

                    {username !== "Guest" && (
                      <button className="save-location-button" onClick={handleSaveLocation}>Save Location</button>
                    )}
                  </div>
                )}

                {username !== "Guest" && (
                  <>
                    <h3 className="location-text">Saved Locations</h3>
                    <div className="saved-locations-tabs">
                      <SavedLocations
                        username={username}
                        savedLocationsChanged={savedLocationsChanged}
                        onSearch={handleSearch} // Pass down the onSearch function
                      />
                    </div>
                  </>
                )}
              </>
            } />
            <Route path="/auth" element={<AuthPage updateUsername={setUsername} />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
