import React, { useState, useEffect } from "react";

const ShowWeather = ({ data }) => {
  const [dynamicBackground, setDynamicBackground] = useState("");
  const city = data.name;
  const country = data.sys ? data.sys.country : null;
  const temperature = data.main ? data.main.temp : null;
  const pressure = data.main ? data.main.pressure : null;
  const visibility = data ? data.visibility : null;
  const humidity = data.main ? data.main.humidity : null;
  const clouds = data.clouds ? data.clouds.all : null;
  const sunrise = data.sys ? data.sys.sunrise : null;
  const sunset = data.sys ? data.sys.sunset : null;
  const timezoneOffsetSeconds = data.timezone ? data.timezone : null;

  // Caluculate local time
  // get UTC time in milliseconds
  const nowUTC = new Date().getTime();
  // get local timezone offset and convert to milliseconds
  const localOffset = timezoneOffsetSeconds * 1000;
  // get the local time by passing in the UTC time and the local offset
  const localTimeRemotely = new Date(nowUTC + localOffset);
  console.log("local time remotely", localTimeRemotely);

  // get time for local machine

  const machineTime = new Date().toLocaleTimeString();
  const localTime = machineTime === localTimeRemotely ? machineTime : localTimeRemotely.toLocaleTimeString();

  // Values in standard units

  const pressureInAtm = (pressure / 1000).toFixed(2);
  const tempInCelcius = (temperature / 10).toFixed(2);
  const tempInFahrenheit = ((tempInCelcius * 9) / 5 + 32).toFixed(2);
  const visibilityInKM = (visibility / 1000).toFixed(2);

  // Change border dynamically
  const dynamicBackgroundColor = (temp) => {
    if (temp < 10) {
      setDynamicBackground("#bbeafa");
    }
    if (temp > 10 && temp <= 30) {
      setDynamicBackground("#fcfa5b");
    }

    if (temp > 30) {
      setDynamicBackground(" #ff512f");
    }
  };

  //  useEffect to call dynamicBackgroundColor function
  useEffect(() => {
    dynamicBackgroundColor(tempInCelcius);
  }, [tempInCelcius]);

  return (
    <div
      className="showWeather standard-width"
      style={{ background: dynamicBackground }}
    >
      <header className="weather_header">
        <h1>{city}</h1>
        <h2>Country: {country}</h2>
        <h2>Local Time: {localTime}</h2>
      </header>
      <section className="temperature_section">
        <h2>Temperature</h2>
        <h2 className="temp_celsius">{tempInCelcius}°C</h2> {"/"}
        <h2 className="temp_fahrenheit">{tempInFahrenheit}°F</h2>
      </section>
      <section className="weather_data">
        <div>
          <h4>Pressure</h4>
          <p>{pressureInAtm} atm</p>
        </div>
        <div>
          <h4>Visibility</h4>
          <p>{visibilityInKM} Km</p>
        </div>
        <div>
          <h4>Humidity</h4>
          <p>{humidity}%</p>
        </div>
        <div>
          <h4>Clouds</h4>
          <p>{clouds}%</p>
        </div>

        <div>
          <h4>Sunrise</h4>
          <p>{new Date(sunrise * 1000).toLocaleTimeString()}</p>
        </div>
        <div>
          <h4>Sunset</h4>
          <p>{new Date(sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </section>
    </div>
  );
};

export default ShowWeather;
