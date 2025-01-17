import React from 'react';
import { Line } from 'react-chartjs-2';

function RealTimeChart({ data }) {
    if (!data || data.length === 0) {
        return <p>No data to display</p>;
    }

    const chartData = {
        labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Real-Time Data',
                data: data.map((item) => item.value),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default RealTimeChart;
