import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="https://www.aai.aero/en/airports">Airports</a></li>
                        <li><a href="https://www.aai.aero/en/careers">Careers</a></li>
                        <li><a href="https://www.aai.aero/en/about-us">About Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>AAI CHQ IT Directorate BISAG-N Building<br />
                    Airports Authority of India, IT Headquarters<br />
                    Jor Bagh, New Delhi - 110003</p>
                    <p>Email: <a href="mailto:info@aai.aero">info@aai.aero</a></p>
                </div>
                <div className="footer-section">
                   <p>The Airports Authority of India (AAI), under the Ministry of Civil Aviation, manages and operates 137 airports, including 23 international and 80 domestic airports. AAI also provides Air Traffic Management services, ensuring safe and efficient aircraft operations in Indian airspace. Dedicated to enhancing civil aviation infrastructure, AAI plays a vital role in boosting connectivity and economic growth across India.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Airports Authority of India. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

