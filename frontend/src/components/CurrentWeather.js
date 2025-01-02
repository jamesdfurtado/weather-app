import React from 'react';

function CurrentWeather({ location, temp, condition, high, low, iconCode }) {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Construct the icon URL

  return (
    <div className="current-data">
      <h1 className="location">{location}</h1>
      <div className="current-weather">
        <h1 className="current-temp">{temp}°</h1>
        <h4 className="current-condition">{condition}</h4>
        <h5 className="high-low">H: {high}° L: {low}°</h5>
        {/* Display the icon */}
        <img src={iconUrl} alt={condition} className="weather-icon" />
      </div>
    </div>
  );
}

export default CurrentWeather;
