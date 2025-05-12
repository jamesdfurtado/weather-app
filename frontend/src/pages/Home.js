import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import SavedLocations from '../components/SavedLocations';
import { fetchWeatherByCity, saveLocation } from '../api/weather';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Home() {
  const { username, signOut } = useAuth();

  // holds the current weather data from API
  const [weatherData, setWeatherData] = useState(null);

  // toggled to force reload of saved locations when one is added
  const [savedLocationsChanged, setSavedLocationsChanged] = useState(false);

  // shows search or save errors
  const [error, setError] = useState(null);

  // called when user searches for a city
  const handleSearch = async (city) => {
    try {
      setError(null);
      const res = await fetchWeatherByCity(city);
      const raw = res.data;

      // normalizing data to match SQL DB format
      const normalizedData = {
        location: raw.name,
        temp: Math.round(raw.main.temp),
        condition: raw.weather[0].main,
        high: Math.round(raw.main.temp_max),
        low: Math.round(raw.main.temp_min),
        iconCode: raw.weather[0].icon
      };

      setWeatherData(normalizedData);
    } catch (err) {
      setError('City not found or weather data unavailable.');
    }
  };

  // save a searched city to the user's list
  const handleSaveLocation = async () => {
    if (!weatherData || !username) return;
    try {
      await saveLocation(username, weatherData.location);
      setSavedLocationsChanged(prev => !prev); // triggers refresh
    } catch (err) {
      setError('Failed to save location.');
    }
  };

  return (
    <div className="home-page">
      <header>
        <h1>Weather App</h1>
        <p>Created by James Furtado</p>
        <div className="user-info">
          {username ? (
            <>
              {/* show username and signout if logged in */}
              <span className="username-badge">{username}</span>
              <button className="signout-button" onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <Link to="/auth">Sign In / Sign Up</Link>
          )}
        </div>
      </header>

      {/* city search input */}
      <SearchBar onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

      {/* show weather card and save option if we have data */}
      {weatherData && (
        <>
          <CurrentWeather data={weatherData} />
          {username && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button onClick={handleSaveLocation}>Save Location</button>
            </div>
          )}
        </>
      )}

      {/* show saved cities if logged in */}
      {username && (
        <SavedLocations
          username={username}
          onSearch={handleSearch}
          refreshTrigger={savedLocationsChanged}
        />
      )}
    </div>
  );
}

export default Home;
