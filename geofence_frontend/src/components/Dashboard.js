import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Chart from 'chart.js/auto';

const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 2000; i++) {
        const name = `User ${i}`;
        const entryTimestamp = new Date(
            new Date().setHours(9 + Math.floor(Math.random() * 2), 30 + Math.floor(Math.random() * 60))
        );
        const exitTimestamp = new Date(
            new Date().setHours(17 + Math.floor(Math.random() * 2), 30 + Math.floor(Math.random() * 60))
        );
        dummyData.push({ id: i * 2 - 1, name, status: 'Entry', timestamp: entryTimestamp.toISOString() });
        dummyData.push({ id: i * 2, name, status: 'Exit', timestamp: exitTimestamp.toISOString() });
    }
    return dummyData;
};



const Dashboard = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const data = generateDummyData();
        setEmployeeData(data);
    }, []);

    useEffect(() => {
        const createCharts = () => {
            createEntryLineChart();
            createExitLineChart();
            createEmployeeDistributionPieChart();
            createGeofencePieChart();
        };

        const createEntryLineChart = () => {
            const entryData = calculateTimeDistribution('Entry', '09:30:00', '10:30:00');
            const entryCtx = document.getElementById('entryLineChart');
            if (entryCtx && entryCtx.chart) {
                entryCtx.chart.destroy();
            }
            if (entryCtx) {
                entryCtx.chart = new Chart(entryCtx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(entryData),
                        datasets: [{
                            label: 'Entry Times',
                            data: Object.values(entryData),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        };

        const createExitLineChart = () => {
            const exitData = calculateTimeDistribution('Exit', '17:30:00', '18:30:00');
            const exitCtx = document.getElementById('exitLineChart');
            if (exitCtx && exitCtx.chart) {
                exitCtx.chart.destroy();
            }
            if (exitCtx) {
                exitCtx.chart = new Chart(exitCtx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(exitData),
                        datasets: [{
                            label: 'Exit Times',
                            data: Object.values(exitData),
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        };

        const createEmployeeDistributionPieChart = () => {
            const pieCtx = document.getElementById('pieChart');
            if (pieCtx && pieCtx.chart) {
                pieCtx.chart.destroy();
            }
            if (pieCtx) {
                pieCtx.chart = new Chart(pieCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Employees', 'Interns', 'Support Staff'],
                        datasets: [{
                            data: [50, 30, 20],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                    },
                });
            }
        };

        const createGeofencePieChart = () => {
            const insideCount = Math.floor(Math.random() * 1500);
            const outsideCount = 2000 - insideCount;
            const geofenceCtx = document.getElementById('geofencePieChart');
            if (geofenceCtx && geofenceCtx.chart) {
                geofenceCtx.chart.destroy();
            }
            if (geofenceCtx) {
                geofenceCtx.chart = new Chart(geofenceCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Inside Geofence', 'Outside Geofence'],
                        datasets: [{
                            data: [insideCount, outsideCount],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                    },
                });
            }
        };

        const calculateTimeDistribution = (status, startTime, endTime) => {
            const timeData = {};
            let currentTime = new Date(`2024-07-05T${startTime}`);
            const endTimeObj = new Date(`2024-07-05T${endTime}`);
            while (currentTime <= endTimeObj) {
                const timeLabel = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeData[timeLabel] = 0;
                currentTime.setMinutes(currentTime.getMinutes() + 15);
            }
            employeeData.forEach(employee => {
                if (employee.status === status) {
                    const timestamp = new Date(employee.timestamp);
                    const timeLabel = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    if (timeData.hasOwnProperty(timeLabel)) {
                        timeData[timeLabel]++;
                    }
                }
            });
            return timeData;
        };

        createCharts();

        return () => {
            if (document.getElementById('entryLineChart') && document.getElementById('entryLineChart').chart) {
                document.getElementById('entryLineChart').chart.destroy();
            }
            if (document.getElementById('exitLineChart') && document.getElementById('exitLineChart').chart) {
                document.getElementById('exitLineChart').chart.destroy();
            }
            if (document.getElementById('pieChart') && document.getElementById('pieChart').chart) {
                document.getElementById('pieChart').chart.destroy();
            }
            if (document.getElementById('geofencePieChart') && document.getElementById('geofencePieChart').chart) {
                document.getElementById('geofencePieChart').chart.destroy();
            }
        };
    }, [employeeData]);

    const paginate = (data, page, recordsPerPage) => {
        const startIndex = (page - 1) * recordsPerPage;
        return data.slice(startIndex, startIndex + recordsPerPage);
    };

    const totalPages = Math.ceil(employeeData.length / recordsPerPage);
    const paginatedData = paginate(employeeData, currentPage, recordsPerPage);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <div className="graphs-section">
                <div className="graph">
                    <canvas id="entryLineChart"></canvas>
                </div>
                <div className="graph">
                    <canvas id="exitLineChart"></canvas>
                </div>
            </div>

            <div className="pie-charts-section">
                <div className="pie-chart">
                    <canvas id="pieChart"></canvas>
                </div>
                <div className="pie-chart">
                    <canvas id="geofencePieChart"></canvas>
                </div>
            </div>
            

            <div className="employee-log-section">
                <h3>Employee Log</h3>
                <table className="employee-log-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.status}</td>
                                <td>{new Date(employee.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
