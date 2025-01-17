import React, { useState, useEffect } from 'react';
import socket from './socket';
import RealTimeChart from './RealTimeChart';
import ChartJS from './Chart';
import './index.css';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log('Received Data:', parsedData);
            setData((prevData) => [...prevData, parsedData]);
        };
    }, []);

    return (
        <div className="container">
            <h1>Real-Time Dashboard</h1>
            {data.length > 0 ? (
                <RealTimeChart data={data} />
            ) : (
                <p>Waiting for data...</p>
            )}
        </div>
    );
}

export default App;
