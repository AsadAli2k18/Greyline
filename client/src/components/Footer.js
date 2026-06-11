import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/api/newsletter', { email });
      setNewsletterStatus({ type: 'success', message: response.data.message });
      setEmail('');
      setTimeout(() => setNewsletterStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setNewsletterStatus({ type: 'error', message: errorMessage });
      setTimeout(() => setNewsletterStatus({ type: '', message: '' }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Greyline Accountants Ltd.</h3>
            <p>Professional accounting and tax services for SMEs, sole traders, and individuals.</p>
          </div>

          <div className="footer-section">
            <h4>Quick links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:info@greylineaccountants.co.uk">info@greylineaccountants.co.uk</a></li>
              <li><a href="tel:+447428415130">+44 7428 415130</a></li>
            </ul>
          </div>

          <div className="footer-section footer-address">
            <h4>Subscribe to our newsletter</h4>
            <p className="newsletter-text">Get accounting and tax insights straight to your inbox</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus.message && (
              <div className={`newsletter-status ${newsletterStatus.type}`}>
                {newsletterStatus.message}
              </div>
            )}
            <p className="newsletter-privacy">
              By subscribing you agree with our Privacy Policy and provide consent to receive updates from our company.
            </p>
          </div>

          <div className="footer-section">
            <h4>Address</h4>
            <p>5 HERMITAGE ROAD, WOKING, ENGLAND, GU21 8TE</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Greyline Accountants Ltd. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
