const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Define your Finnhub API Key
const FINNHUB_API_KEY = 'ctrcih1r01qhb16miqt0ctrcih1r01qhb16miqtg';

// Define the route for fetching stock data
app.get("/api/stock/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    // Fetch stock data using Finnhub API
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: FINNHUB_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Finnhub API:", error);
    res.status(500).send("Error fetching data from Finnhub API");
  }
});

// Define the route for fetching IoT sensor data
app.get("/api/sensor", async (req, res) => {
  // Simulated IoT data or fetch real data
  const sensorData = {
    temperature: Math.random() * 40, // Simulated temperature data
    humidity: Math.random() * 100,   // Simulated humidity data
  };
  res.json(sensorData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
