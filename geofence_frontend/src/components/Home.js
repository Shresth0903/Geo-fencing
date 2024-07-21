import React, { useEffect } from 'react';
import './Home.css';
import LoginSignup from './LoginSignup/LoginSignup';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Home = () => {
    useEffect(() => {
        const map = L.map('map').setView([28.589030, 77.216790], 15);

        // Using a white tile layer
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 20
        }).addTo(map);

        // Adding and styling the polygon
        L.polygon([
            [28.585355, 77.211799],
            [28.585379, 77.211498],
            [28.585125, 77.211471],
            [28.585101, 77.211788]
        ], {
            color: 'red', // Border color
            fillColor: 'red', // Fill color
            fillOpacity: 0.5 // Fill opacity
        }).addTo(map);

        const customMarkerIcon = L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.marker([28.585232, 77.211639], { icon: customMarkerIcon }).addTo(map)
            .bindPopup('AAI CHQ IT Directorate')
            .openPopup();

        // Clean-up function
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="home-container">
            <div className="welcome-container">
                <LoginSignup />
            </div>
            <div id="map" className="map-container"></div>
        </div>
    );
};

export default Home;
