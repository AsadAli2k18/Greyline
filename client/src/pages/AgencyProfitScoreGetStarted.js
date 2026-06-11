import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AgencyProfitScoreGetStarted.css';

const AgencyProfitScoreGetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    agencyName: '',
    website: '',
    annualRevenue: '',
    teamSize: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const roles = [
    'Founder',
    'CEO',
    'Managing Director',
    'Director',
    'Co-Founder',
    'Owner',
    'Other'
  ];

  const annualRevenueOptions = [
    'Under £100k',
    '£100k - £250k',
    '£250k - £500k',
    '£500k - £1m',
    '£1m - £3m',
    '£3m - £5m',
    '£5m+'
  ];

  const teamSizeOptions = [
    '1-5 people',
    '6-10 people',
    '11-15 people',
    '16-30 people',
    '31-50 people',
    '51-100 people',
    '100+ people'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.role) {
      newErrors.role = 'Your role is required';
    }

    if (!formData.agencyName.trim()) {
      newErrors.agencyName = 'Agency name is required';
    }

    if (!formData.annualRevenue) {
      newErrors.annualRevenue = 'Annual revenue is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Team size is required';
    }

    if (!privacyAgreed) {
      newErrors.privacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form data to backend
      await axios.post('/api/agency-profit-score/get-started', formData);
      
      // Navigate to assessment page with user data
      navigate('/agency-profit-score/assessment', {
        state: { userData: formData }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if API fails, proceed to assessment
      navigate('/agency-profit-score/assessment', {
        state: { userData: formData }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="get-started-page">
      <div className="get-started-container">
        <div className="get-started-header">
          <div className="header-logo">
            <h1 className="logo-text">Greyline Accountants Ltd.</h1>
            <p className="logo-subtitle">AGENCY PROFIT SCORE™</p>
          </div>
        </div>

        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Get Started</h2>
            <p className="form-subtitle">
              Fill in your details below to receive your personalised scorecard report.
            </p>
          </div>

          <form className="get-started-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title">ABOUT YOU</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">
                  Your Role <span className="required">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? 'error' : ''}
                >
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">YOUR AGENCY</h3>
              
              <div className="form-group">
                <label htmlFor="agencyName">
                  Agency Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  className={errors.agencyName ? 'error' : ''}
                  placeholder="Enter your agency name"
                />
                {errors.agencyName && <span className="error-message">{errors.agencyName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.yourwebsite.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="annualRevenue">
                  Annual Revenue <span className="required">*</span>
                </label>
                <select
                  id="annualRevenue"
                  name="annualRevenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                  className={errors.annualRevenue ? 'error' : ''}
                >
                  <option value="">Select annual revenue</option>
                  {annualRevenueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.annualRevenue && <span className="error-message">{errors.annualRevenue}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="teamSize">
                  Team Size <span className="required">*</span>
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className={errors.teamSize ? 'error' : ''}
                >
                  <option value="">Select team size</option>
                  {teamSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.teamSize && <span className="error-message">{errors.teamSize}</span>}
              </div>
            </div>

            <div className="privacy-section">
              <label className="privacy-checkbox">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => {
                    setPrivacyAgreed(e.target.checked);
                    if (errors.privacy) {
                      setErrors({ ...errors, privacy: '' });
                    }
                  }}
                />
                <span>
                  I agree to the{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    privacy policy
                  </a>
                  . By submitting, you consent to Greyline Accountants Ltd. processing your data to deliver your scorecard results and contacting you with related insights. You can unsubscribe at any time.
                </span>
              </label>
              {errors.privacy && <span className="error-message">{errors.privacy}</span>}
            </div>

            <button
              type="submit"
              className="btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Starting...
                </>
              ) : (
                'Start My Scorecard'
              )}
            </button>

            <p className="form-footer-text">
              Takes under 5 minutes · Your data is 100% confidential
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfitScoreGetStarted;
