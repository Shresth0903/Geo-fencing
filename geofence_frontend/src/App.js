import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Forms from './components/Forms';
import Userboard from './components/Userboard';
import About from './components/About';


function App() {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "#042743";
            document.body.style.color = "white";
        } else {
            setMode("light");
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    };

    return (
        <Router>
            <>
                <Navbar title="AAI Geo-Fencing" aboutText="Dashboard" mode={mode} toggleMode={toggleMode} />
                <div className={`App ${mode === 'dark' ? 'dark-mode' : ''}`}>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/forms" element={<Forms />} />
                            <Route path="/user" element={<Userboard/>} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </>
        </Router>
    );
}

export default App;

