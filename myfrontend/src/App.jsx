import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WeatherSearch from './pages/WeatherSearch';
import WeatherReport from './pages/WeatherReport';

const App = () => {
  return (
    
    <Routes>
       
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/weather-search" element={<WeatherSearch />} />
      <Route path="/weather-report" element={<WeatherReport />} />
    </Routes>
  );
};

export default App;
