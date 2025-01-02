import React from 'react';

function FiveDayForecast({ forecastData, currentDateTime }) {
  // Get today's date and calculate the next 4 days
  const today = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="five-day-forecast-box">
      <h3>5-Day Forecast</h3>
      <div className="five-day-forecast">
        {forecastData.map((day, index) => {
          // Get the day name (Today for the first day, then next 4 days)
          const dayName = index === 0
            ? 'Today' 
            : daysOfWeek[(today.getDay() + index) % 7]; // Calculate the next 4 days

          return (
            <div key={index} className="forecast-item">
              <span className="day-name">{dayName}</span>
              <img src={day.icon} alt={day.condition} className="forecast-icon" />
              <span className="temp-high">{day.high}°</span>
              <span className="temp-low">{day.low}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FiveDayForecast;
