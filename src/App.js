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
    setError(false);
    setCityName(inputCity);
  };

  // API key for the OpenWeatherMap API
  const api_key_weather_app = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  console.log(api_key_weather_app);

  // Define the API endpoint URL
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key_weather_app}`;

  // Function to fetch weather data from the provided URL
  async function fetchData(URL) {
    const response = await fetch(URL); // Get data from the API
    const data = await response.json();
    console.log(data);
    // Check for errors in the response
    if (data.cod === "404") {
      setError(true);
      console.log(error);
    } else {
      setWeatherData(data); // Set the fetched data to state if no error
    }
  }

  // useEffect hook to fetch weather data when the URL (cityName) changes
  useEffect(() => {
    fetchData(URL);
  }, [URL]);

  // JSX to render the application
  return (
    <div>
      <Header />

      {/* Pass necessary props to the InputCity component */}
      <InputCity
        city={inputCity}
        onInputHandler={inputHandler}
        onCitySubmit={submitHandler}
      />

      {/* Conditionally render error message or the weather data */}
      {error ? (
        <h3 className="error">No data found :( </h3>
      ) : (
          <ShowWeather data={weatherData} />
        )}
    </div>
  );
}