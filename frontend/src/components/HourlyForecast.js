import React from 'react';

function HourlyForecast({ placeholderTemp, currentDateTime }) {
  // Get the current hour from the currentDateTime
  const currentHour = new Date(currentDateTime).getHours();
  
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-forecast-container">
        {[...Array(24)].map((_, index) => {
          const hour = (currentHour + index) % 24; // Calculate the future hour
          const hourIn12Format = hour % 12 || 12; // Convert to 12-hour format
          const ampm = hour < 12 ? 'AM' : 'PM'; // Determine AM/PM

          // Display "Now" for the current hour
          const hourDisplay = index === 0 ? "Now" : `${hourIn12Format} ${ampm}`;

          return (
            <div className="hour-block" key={index}>
              <p className="hour-time">{hourDisplay}</p> {/* Show "Now" for current hour */}
              <img
                className="hour-icon"
                src="weather-icon-placeholder.png" // Replace with actual weather icon source
                alt="Weather icon"
              />
              <p className="hour-temp">{placeholderTemp}°F</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
