import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/weatherreports.css"
import {Link} from "react-router-dom"
const WeatherReports = () => {
  const [reports, setReports] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/weather/report");
        console.log("Full API Response:", res);
        console.log("Response Data:", res.data);
        console.log("API Results:", res.data.results);

        if (Array.isArray(res.data.results)) {
          setReports(res.data.results); // Safely set reports
          console.log("Reports Set Successfully:", res.data.results);
        } else {
          console.error("Unexpected API Response Structure:", res.data.results);
        }
      } catch (err) {
        console.error("Error fetching weather reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container-fluid p-4">
      {/* Page Title */}
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="weather-reports-title">Weather Reports</h2>
        </div>
      </div>

      {/* Weather Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered weather-table">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>City</th>
              <th>Temperature</th>
              <th>Visibility</th>
              <th>Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.user_name || "N/A"}</td>
                <td>{report.city || "N/A"}</td>
                <td>
                  {report.weather_data?.temperature
                    ? `${report.weather_data.temperature}°C`
                    : "N/A"}
                </td>
                <td>
                  {report.weather_data?.visibility
                    ? `${report.weather_data.visibility} km`
                    : "N/A"}
                </td>
                <td>
                  {report.weather_data?.wind_speed
                    ? `${report.weather_data.wind_speed} km/h`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <Link to="/" className='btn btn-danger'>Logout</Link>
                    <Link to="/weather-search" className='btn btn-info ms-3'>WeatherSearch</Link>
      </div>
    </div>
  );
};

export default WeatherReports;
