import React from "react";

const Header = () => {
  return (
    <header className="weather-header">
      <div className="weatherData">
        <img src="/public/weather_app_logo_clear.png" alt="Weather App Icon" />
        <h1>Weather App</h1>
      </div>
      <p>Your go-to source for current weather information!</p>
    </header>
  );
};

export default Header;
