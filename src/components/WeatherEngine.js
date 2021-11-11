import React, { useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=89b0f41c354a26da7abce80d37e07238`
      );
      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };

  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div>
      if{" "}
      {!loading && !error ? (
        <div>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />

          <form>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={(e) => handleSearch(e)}> Search </button>
          </form>
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            width: "200px",
            height: "240px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PulseLoader size={15} color="purple" />
        </div>
      ) : !loading && error ? (
        <div style={{ color: "black" }}>
          There has been an Error! <br />
          <button onClick={() => setError(false)}>Reset</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
