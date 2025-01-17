const express = require('express');
const WebSocket = require('ws');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check for API Key
if (!process.env.API_KEY) {
    console.error('Error: API_KEY is missing in the environment variables');
    process.exit(1);
}

// REST API Endpoint
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Example API Endpoint for Market Data
app.get('/api/market', async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/market', {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching market data:', error.message);
        res.status(500).json({ error: 'Error fetching market data' });
    }
});

// Start Express Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket Server
const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', (socket) => {
    console.log('New WebSocket connection established');

    // Send welcome message
    socket.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

    // Simulate real-time data
    const intervalId = setInterval(() => {
        const data = {
            timestamp: new Date().toISOString(),
            value: (Math.random() * 100).toFixed(2), // Random value
        };
        socket.send(JSON.stringify(data));
    }, 1000); // Send data every second

    // Cleanup on disconnection
    socket.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(intervalId);
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
