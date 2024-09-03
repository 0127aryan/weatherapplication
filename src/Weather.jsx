import React, { useState } from "react";
import './weather.css'

const api = {
  key: "37f019b8f6e950daae80b31c1afdff06",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let className = 'app';

  if (typeof weather.main !== "undefined") {
    switch (weather.weather[0].main.toLowerCase()) {
      case 'haze':
        className = 'app-haze';
        break;
      case 'clouds':
        className = 'app-clouds';
        break;
      case 'rain':
        className = 'app-rain';
        break;
      case 'clear':
        className = 'app-clear';
        break;
      case 'thunderstorm':
        className = 'app-thunderstorm';
        break;
      case 'snow':
        className = 'app-snow';
        break;
      default:
        className = 'app';
    }
  }

  return (
    <div className={className}>
      <main>
        <div className="searchbox">
          <input
            type="text"
            className="searchbar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />

          {(typeof weather.main !== "undefined") ? (
            <div className="locationbox">
              <div className="location">
                {weather.name}, {weather.sys.country}
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weatherbox">
                <div className="temp">
                  {Math.round(weather.main.temp)}℃
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          ) : ('')}
        </div>
        
      </main>
    </div>
  );
};

export default Weather;