import React, { useState, useEffect } from "react";

const ShowWeather = ({ data }) => {
  const [dynamicBackground, setDynamicBackground] = useState("");
  const city = data.name;
  const country = data.sys ? data.sys.country : null;
  const weather = data.weather ? data.weather[0].description : null;
  const weatherIcon = data.weather ? data.weather[0].icon : null;
  const temperature = data.main ? data.main.temp : null;
  const feelsLikeTemp = data.main ? data.main.feels_like : null;
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
  console.log(nowUTC);

  // get local timezone offset and convert to milliseconds
  const localOffset = timezoneOffsetSeconds * 1000;
  // get UTC time in milliseconds

  // Assume nowUTC and localOffset are given in milliseconds
  const date = new Date(nowUTC + localOffset);

  // Extract time components
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  // Determine AM or PM
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
  }

  // Convert to 12-hour format
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  // Pad minutes and seconds with a zero if they are single digits
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the 12-hour time string
  const time12hr = `${hours}:${minutes} ${period}`;

  console.log(time12hr); // This will output the time in 12-hour format with AM/PM

  // Values in standard units

  const pressureInAtm = (pressure / 1000).toFixed(2);
  const tempInCelcius = (temperature - 273.15).toFixed(0);
  const tempInFahrenheit = ((tempInCelcius * 9) / 5 + 32).toFixed(0);
  const feelsLikeTempC = (feelsLikeTemp - 273.15).toFixed(0);
  const feelsLiketempInF = ((tempInCelcius * 9) / 5 + 32).toFixed(0);
  const visibilityInKM = (visibility / 1000).toFixed(2);

 // Add weather icon


  // Change border dynamically
  const dynamicBackgroundColor = (temp) => {
    if (temp < 10) {
      setDynamicBackground("blue-gradient");
    }
    if (temp > 10 && temp <= 30) {
      setDynamicBackground("yellow-gradient");
    }
    if (temp > 30) {
      setDynamicBackground("red-gradient");
    }
  };

  //  useEffect to call dynamicBackgroundColor function
  useEffect(() => {
    dynamicBackgroundColor(tempInCelcius);
  }, [tempInCelcius]);

  return (
    <div className="showWeather" style={{ background: dynamicBackground }}>
      <header className="weather_header">
        <h1>{city}</h1>
        <h4>Local Time: {time12hr}</h4>
        <hr />
        <h2>{weather}</h2>
        {/* <h4>Country: {country}</h4> */}
        <img src={`/icons/${weatherIcon}.png`} alt="weather-icon" />
      </header>
      <section className="temperature_section">
        <div className="actual-temp break-after">
            <h2>Temperature</h2>
            <h2 className="temp_celsius">{tempInCelcius}°C</h2> {"/"}
            <h2 className="temp_fahrenheit">{tempInFahrenheit}°F</h2>
        </div>
        <div className="description"> 
         <h3></h3>
        </div>
   
        <div className="feels-temp">
            <h3>Feels Like</h3>
            <h4 className="temp_celsius">{feelsLikeTempC}°C</h4> {"/"}
            <h4 className="temp_fahrenheit">{feelsLiketempInF}°F</h4>
        </div>
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
          <p>{new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div>
          <h4>Sunset</h4>
          <p>{new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </section>
    </div>
  );
};

export default ShowWeather;
