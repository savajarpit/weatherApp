
# WeatherApp Setup Guide

## Database Setup

1. **Create the Database:**

   ```sql
   CREATE DATABASE weather_app;

   USE weather_app;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     password VARCHAR(255)
   );

   CREATE TABLE weather_reports (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     city VARCHAR(255),
     weather_data JSON,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

## `.env` File Configuration

Create a `.env` file in the `backend` directory with the following contents:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=weather_app
JWT_SECRET=your_secret_key
WEATHERSTACK_API_KEY=your_api_key
```

Replace the placeholders:
- `your_password`: Your MySQL database password
- `your_secret_key`: Your secret key for JWT
- `your_api_key`: Your API key for WeatherStack (or any other weather API you are using)

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd myfrontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node server.js
   ```

---

This guide will help you set up and run the WeatherApp project locally.
