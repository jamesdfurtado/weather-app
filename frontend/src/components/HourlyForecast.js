import React from 'react';

function HourlyForecast({ placeholderTemp }) {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-forecast-container">
        {[...Array(24)].map((_, index) => (
          <div className="hour-block" key={index}>
            <p className="hour-time">{index % 12 || 12} {index < 12 ? 'AM' : 'PM'}</p>
            <img
              className="hour-icon"
              src="weather-icon-placeholder.png" // Replace with actual weather icon source
              alt="Weather icon"
            />
            <p className="hour-temp">{placeholderTemp}°F</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
