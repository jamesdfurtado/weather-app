import React from 'react';

function FiveDayForecast({ forecastData }) {
  return (
    <div className="five-day-forecast-box">
      <h3>5-Day Forecast</h3>
      <div className="five-day-forecast">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-item">
            <span className="day-name">{day.name}</span>
            <img src={day.icon} alt={day.condition} className="forecast-icon" />
            <span className="temp-high">{day.high}°</span>
            <span className="temp-low">{day.low}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiveDayForecast;
