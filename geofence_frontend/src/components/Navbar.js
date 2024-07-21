import React from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    const { isAuthenticated } = props;

    return (
        <nav className={`navbar sticky-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/aai_logo.png" alt="AAI Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard">{props.aboutText}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/forms">Requisition Form</Link>
                        </li>
                    </ul>
                    <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                    </div>
                    {isAuthenticated && (
                        <div className="navbar-text ms-3">
                            <FaUser /> {/* Render the user icon */}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    mode: PropTypes.string.isRequired,
    toggleMode: PropTypes.func.isRequired,
    aboutText: PropTypes.string,
    isAuthenticated: PropTypes.bool // Prop indicating if user is authenticated
};

Navbar.defaultProps = {
    aboutText: "About",
    isAuthenticated: false
};

export default Navbar;



