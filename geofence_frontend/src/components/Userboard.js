import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Userboard.css';

const generateDummyUserData = () => {
    const entryTimes = [];
    const exitTimes = [];
    const startDate = new Date();

    for (let i = 0; i < 10; i++) {
        const entryTime = new Date(startDate);
        entryTime.setDate(startDate.getDate() + i);
        entryTime.setHours(9 + Math.floor(Math.random() * 2), 30 + Math.floor(Math.random() * 30));

        const exitTime = new Date(entryTime);
        exitTime.setHours(17 + Math.floor(Math.random() * 2), 30 + Math.floor(Math.random() * 30));

        entryTimes.push(entryTime.toISOString());
        exitTimes.push(exitTime.toISOString());
    }

    return {
        name: 'Shresth',
        entryTimes,
        exitTimes,
    };
};

const Userboard = () => {
    const userData = generateDummyUserData();
    const { name = 'User', entryTimes = [], exitTimes = [] } = userData;

    useEffect(() => {
        createEntryLineChart();
        createExitLineChart();
    }, [entryTimes, exitTimes]);

    const createEntryLineChart = () => {
        const ctx = document.getElementById('entryLineChart');
        if (ctx && ctx.chart) {
            ctx.chart.destroy();
        }
        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: entryTimes.map((entry) => new Date(entry).toLocaleTimeString()),
                datasets: [{
                    label: 'Entry Times',
                    data: entryTimes.map((entry) => new Date(entry).toLocaleDateString()),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Entry Time',
                        },
                    },
                    y: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Date',
                        },
                        labels: [...new Set(entryTimes.map(entry => new Date(entry).toLocaleDateString()))],
                    },
                },
            },
        });
    };

    const createExitLineChart = () => {
        const ctx = document.getElementById('exitLineChart');
        if (ctx && ctx.chart) {
            ctx.chart.destroy();
        }
        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: exitTimes.map((exit) => new Date(exit).toLocaleTimeString()),
                datasets: [{
                    label: 'Exit Times',
                    data: exitTimes.map((exit) => new Date(exit).toLocaleDateString()),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Exit Time',
                        },
                    },
                    y: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Date',
                        },
                        labels: [...new Set(exitTimes.map(exit => new Date(exit).toLocaleDateString()))],
                    },
                },
            },
        });
    };

    return (
        <div className="user-dashboard-container">
            <h2>Welcome, {name}!</h2>
            <div className="time-log-section">
                <h3>Your Entry and Exit Times</h3>
                <table className="time-log-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entryTimes.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry).toLocaleDateString()}</td>
                                <td>{new Date(entry).toLocaleTimeString()}</td>
                                <td>{new Date(exitTimes[index]).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="line-charts-section">
                <div className="line-chart">
                    <canvas id="entryLineChart"></canvas>
                </div>
                <div className="line-chart">
                    <canvas id="exitLineChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Userboard;
