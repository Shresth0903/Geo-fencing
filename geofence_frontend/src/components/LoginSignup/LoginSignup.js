import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import phone_icon from '../Assets/phone.png';

const LoginSignup = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [agreeLocation, setAgreeLocation] = useState(false); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!agreeLocation) {
            setMessage('Please agree to share your location.');
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationData = { latitude, longitude };

                const url = action === 'Login' ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
                const data = action === 'Login' ? { username, locationData } : { username, email, phoneNumber, locationData };

                try {
                    const response = await axios.post(url, data);
                    if (action === 'Login') {
                        localStorage.setItem('token', response.data.access_token);
                        setIsLoggedIn(true);
                        setWelcomeMessage(`Welcome, ${username}!`);
                        setMessage('Login successful');
                        navigate('/user'); // 
                    } else {
                        setMessage('Signup successful');
                    }
                } catch (error) {
                    setMessage(error.response?.data?.message || 'An error occurred');
                }
            }, (error) => {
                console.error('Error fetching location:', error.message);
                setMessage('Error fetching location. Please try again.');
            });
        } else {
            setMessage('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className='container'>
            {!isLoggedIn ? (
                <div>
                    <div className="tabs">
                        <div 
                            className={`tab ${action === 'Sign Up' ? 'active' : ''}`} 
                            onClick={() => { setAction('Sign Up'); setMessage(''); }}
                        >
                            Signup
                        </div>
                        <div 
                            className={`tab ${action === 'Login' ? 'active' : ''}`} 
                            onClick={() => { setAction('Login'); setMessage(''); }}
                        >
                            Login
                        </div>
                    </div>
                    <form className="inputs" onSubmit={handleSubmit}>
                        {action === "Login" ? null : (
                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input
                                type="email"
                                placeholder='Email ID'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={phone_icon} alt="" />
                            <input
                                type="text"
                                placeholder='Phone Number'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                id="agreeLocation"
                                checked={agreeLocation}
                                onChange={(e) => setAgreeLocation(e.target.checked)}
                            />
                            <label htmlFor="agreeLocation" className="checkbox-label">Agree to share your location</label>
                        </div>
                        <button type="submit" className="submit-button">{action}</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            ) : (
                <div className="welcome-message">
                    <p>{welcomeMessage}</p>
                </div>
            )}
        </div>
    );
};

export default LoginSignup;
