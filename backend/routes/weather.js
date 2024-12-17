const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../db");

const router = express.Router();

// Fetch weather for a city
router.post("/search", authMiddleware, async (req, res) => {
  const { city } = req.body;
  
  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${city}`);
    const weatherData = response.data;
    console.log(weatherData)
    if (weatherData.error) return res.status(404).json({ message: "City not found" });

    // Save search to database
    const query = "INSERT INTO weather_reports (user_id, city, weather_data) VALUES (?, ?, ?)";
    db.query(query, [req.user.id, city, JSON.stringify(weatherData.current)], (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
    });

    res.status(200).json(weatherData.current);
  } catch (err) {
    res.status(500).json({ message: "API error" });
  }
});

// Fetch weather search report
router.get("/report", authMiddleware, (req, res) => {
  const query = `
    SELECT u.name as user_name, r.city, r.weather_data 
    FROM weather_reports r
    JOIN users u ON r.user_id = u.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
   
    res.status(200).json({results});
    
  });
});

module.exports = router;
