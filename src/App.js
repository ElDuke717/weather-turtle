// Import necessary hooks and components
import React, { useEffect, useState } from "react";
import InputCity from "./Components/InputCity";
import Header from "./Components/Header";
import ShowWeather from "./Components/ShowWeather";
import "./App.css";

export default function App() {
  // Define state variables
  const [weatherData, setWeatherData] = useState({}); // Holds weather data from API
  const [inputCity, setInputCity] = useState("Richmond"); // Holds the current value in the input
  const [cityName, setCityName] = useState("Richmond"); // Holds the city name to use for API calls
  const [error, setError] = useState(false); // A flag to determine if there was an error fetching data

  // Handler for changes in the city input element
  const inputHandler = (e) => {
    setInputCity(e.target.value);
  };

  // Handler for the search button/form submission
  const submitHandler = (city) => {
    console.log("received city", city);
    setError(false);
    setCityName(city);
  };
  console.log("post submitHandler", cityName);
  // API key for the OpenWeatherMap API
  const api_key_weather_app = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  console.log("city name", cityName);
  

  console.log("URL", URL);

  // Function to fetch weather data from the provided URL
  async function fetchData(URL) {
    console.log("Fetching data from: ", URL);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("There was an error fetching data:", error);
      setError(true);
    }
  }

  // useEffect hook to fetch weather data when the URL (cityName) changes
  useEffect(() => {
    console.log("running useEffect for ", cityName);
    // Define the API endpoint URL
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key_weather_app}`;
    console.log("URL", URL);
    fetchData(URL);
  }, [cityName]);

  // JSX to render the application
  return (
    <div className="field">
      <Header />

      {/* Pass necessary props to the InputCity component */}
      <InputCity
        city={inputCity}
        onInputHandler={inputHandler}
        onCitySubmit={submitHandler}
      />

      {/* Conditionally render error message or the weather data */}
      {error ? (
        <div className="no-data">
          <p>No Weather Data for that location</p>
        </div>
      ) : (
        <ShowWeather data={weatherData} />
      )}
    </div>
  );
}
