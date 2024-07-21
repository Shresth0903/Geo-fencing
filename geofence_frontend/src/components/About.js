import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './About.css';
import office1 from './Assets/office1.jpg'
import office2 from './Assets/office2.jpg'

// Fix for missing marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const About = () => {
    const position = [28.589030, 77.216790];
    const metroStation = {
        name: 'Jor Bagh (Yellow Line)',
        position: [28.589030, 77.216790], // Example coordinates for the metro station
    };

    return (
        <div className="about-container">
            <h1>About Us</h1>
            <div className="slideshow-container">
                <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false}>
                    <div>
                        <img src={office1} alt="Description 1" />
                    </div>
                    <div>
                        <img src={office2} alt="Description 2" />
                    </div>
                    <div>
                        <img src="/path/to/image3.jpg" alt="Description 3" />
                    </div>
                </Carousel>
            </div>
            <div className="map-container">
                <h2>Our Location</h2>
                <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>Our Office Location</Popup>
                    </Marker>
                    <Marker position={metroStation.position}>
                        <Popup>{metroStation.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className="metro-station-info">
                <h2>Nearest Metro Station</h2>
                <p>{metroStation.name}</p>
            </div>
        </div>
    );
};

export default About;
