import React from "react";

const Header = () => {
  return (
    <header className="weather-header">
      <div className="weatherData">
        <img
          className="header-logo"
          src="/weather_app_logo_clear.png"
          alt="Weather App Icon"
        />
        <h1>Weather App</h1>
      </div>
    </header>
  );
};

export default Header;
