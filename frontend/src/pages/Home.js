import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import SavedLocations from '../components/SavedLocations';
import { fetchWeatherByCity, saveLocation } from '../api/weather';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Home() {
  const { username, signOut } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [savedLocationsChanged, setSavedLocationsChanged] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setError(null);
      const res = await fetchWeatherByCity(city);
      const raw = res.data;

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

  const handleSaveLocation = async () => {
    if (!weatherData || !username) return;
    try {
      await saveLocation(username, weatherData.location);
      setSavedLocationsChanged(prev => !prev);
    } catch (err) {
      setError('Failed to save location.');
    }
  };

  return (
    <div className="home-page">
      <header>
        <h1>Weather App</h1>
        <p>Created by James Furtado</p>
        <div>
          {username ? (
            <>
              <span>Welcome, {username}</span>
              <button onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <Link to="/auth">Sign In / Sign Up</Link>
          )}
        </div>
      </header>

      <SearchBar onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <>
          <CurrentWeather data={weatherData} />
          {username && (
            <button onClick={handleSaveLocation}>Save Location</button>
          )}
        </>
      )}

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
