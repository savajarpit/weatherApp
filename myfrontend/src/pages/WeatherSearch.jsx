import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';

const WeatherSearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);  

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await API.post('/weather/search', { city });
      setWeather(res.data);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Weather Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading ? ( 
        <div className="loader">Loading...</div>
      ) : (
        <>
          <h1 className="mt-3">Weather of {city}</h1><br />
          <h3>Temperature: {weather.temperature ? `${weather.temperature}°C` : ""}</h3>
          <h3>Wind Speed: {weather.wind_speed ? `${weather.wind_speed} km/h` : ""}</h3>
          <h3>Visibility: {weather.visibility ? `${weather.visibility} km` : ""}</h3>
        </>
      )}

      <Link to="/" className="btn btn-danger mt-3">Logout</Link>
      <Link to="/weather-report" className="btn btn-info ms-3 mt-3">Weather Report</Link>
    </div>
  );
};

export default WeatherSearch;
