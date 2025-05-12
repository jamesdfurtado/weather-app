import React from 'react';

function CurrentWeather({ data }) {
  const { location, temp, condition, high, low, iconCode } = data;

  // grab weather icon from OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="current-data">
      <h1>{location}</h1>
      <div className="current-weather">
        <h2>{temp}°</h2>
        <h4>{condition}</h4>
        <h5>H: {high}° L: {low}°</h5>
        <img src={iconUrl} alt={condition} />
      </div>
    </div>
  );
}

export default CurrentWeather;
