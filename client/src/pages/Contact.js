import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const ACC4_HERO_BG = "url('/images/home/acc4.avif')";

const SERVICE_OPTIONS = [
  'Bookkeeping',
  'VAT Returns',
  'Payroll',
  'Year-End Accounts',
  'Corporation Tax',
  'Personal Tax Return',
  'Company Formation',
  'Management Accounts',
  'Tax Planning',
  'Business Advisory',
  'Registered Address',
];

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  preferredContactMethod: '',
  businessName: '',
  companyRegistrationNumber: '',
  businessType: '',
  annualRevenue: '',
  monthlyTransactions: '',
  vatRegistered: '',
  hasEmployees: '',
  employeeCount: '',
  accountingSoftware: '',
  servicesRequired: [],
  requirements: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleServiceRequired = (label) => {
    setFormData((prev) => {
      const next = new Set(prev.servicesRequired);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return { ...prev, servicesRequired: Array.from(next) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!Array.isArray(formData.servicesRequired) || formData.servicesRequired.length === 0) {
      setStatus({
        type: 'error',
        message: 'Please select at least one service under Services Required.',
      });
      return;
    }

    if (formData.hasEmployees === 'yes') {
      const n = String(formData.employeeCount).trim();
      if (n === '' || Number.isNaN(Number(n)) || Number(n) < 0) {
        setStatus({
          type: 'error',
          message: 'Please enter how many employees you have.',
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const servicesRequired = formData.servicesRequired.filter((s) => SERVICE_OPTIONS.includes(s));
      const payload = {
        ...formData,
        employeeCount:
          formData.hasEmployees === 'yes' ? String(formData.employeeCount).trim() : '',
        servicesRequired,
      };
      const response = await axios.post('/api/contact', payload);
      setSubmitted(true);
      setStatus({ type: 'success', message: response.data.message });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <section className="contact-hero" style={{ '--acc4-hero-bg': ACC4_HERO_BG }}>
          <div className="container">
            <h1 className="page-title">Thank you</h1>
            <p className="page-subtitle">
              Thanks for your enquiry, the next step is to book a quick call so we can understand
              your needs and provide the best solution.
            </p>
          </div>
        </section>

        <section className="contact-content">
          <div className="container">
            <div className="contact-wrapper contact-wrapper--success">
              <div className="contact-form contact-success-card">
                <p className="contact-success-text">
                  Thanks for your enquiry, the next step is to book a quick call so we can understand
                  your needs and provide the best solution.
                </p>
                <a href="tel:+447428415130" className="btn-primary btn-large contact-success-cta">
                  Submit Your Query
                </a>
                <p className="contact-success-note">
                  Or email us at{' '}
                  <a href="mailto:info@greylineaccountants.co.uk">info@greylineaccountants.co.uk</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <section className="contact-hero" style={{ '--acc4-hero-bg': ACC4_HERO_BG }}>
        <div className="container">
          <h1 className="page-title">Client enquiry</h1>
          <p className="page-subtitle">
            Tell us about your business and what you need, our team will review your query and reply
            with clear next steps.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <strong>Email:</strong>
                <p>
                  <a href="mailto:info@greylineaccountants.co.uk">info@greylineaccountants.co.uk</a>
                </p>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <p>
                  <a href="tel:+447428415130">+44 7428 415130</a>
                </p>
              </div>
              <div className="info-item">
                <strong>Office Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <p>
                  5 HERMITAGE ROAD
                  <br />
                  WOKING
                  <br />
                  ENGLAND
                  <br />
                  GU21 8TE
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Submit Your Query</h2>

              <h3 className="form-section-title">1. Basic Information</h3>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredContactMethod">Preferred Contact Method *</label>
                <select
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="call">Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <h3 className="form-section-title">2. Business Details</h3>
              <div className="form-group">
                <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyRegistrationNumber">Company Registration Number (optional)</label>
                <input
                  type="text"
                  id="companyRegistrationNumber"
                  name="companyRegistrationNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="limited_company">Limited Company</option>
                  <option value="sole_trader">Sole Trader</option>
                  <option value="partnership">Partnership</option>
                  <option value="not_registered">Not yet registered</option>
                </select>
              </div>

              <h3 className="form-section-title">3. Financial Snapshot</h3>
              <div className="form-group">
                <label htmlFor="annualRevenue">Annual Revenue *</label>
                <select
                  id="annualRevenue"
                  name="annualRevenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="0-50k">£0 – £50k</option>
                  <option value="50k-150k">£50k – £150k</option>
                  <option value="150k-500k">£150k – £500k</option>
                  <option value="500k-plus">£500k+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="monthlyTransactions">Number of Monthly Transactions *</label>
                <select
                  id="monthlyTransactions"
                  name="monthlyTransactions"
                  value={formData.monthlyTransactions}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="0-50">0–50</option>
                  <option value="50-200">50–200</option>
                  <option value="200-plus">200+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="vatRegistered">Are you VAT registered? *</label>
                <select
                  id="vatRegistered"
                  name="vatRegistered"
                  value={formData.vatRegistered}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="not_sure">Not sure</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="hasEmployees">Do you have employees? *</label>
                <select
                  id="hasEmployees"
                  name="hasEmployees"
                  value={formData.hasEmployees}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {formData.hasEmployees === 'yes' && (
                  <div className="form-group form-group--nested form-group--nested-select">
                    <label htmlFor="employeeCount">Number of employees *</label>
                    <input
                      type="number"
                      id="employeeCount"
                      name="employeeCount"
                      min="0"
                      step="1"
                      value={formData.employeeCount}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              <h3 className="form-section-title">4. Accounting Setup</h3>
              <div className="form-group">
                <label htmlFor="accountingSoftware">What accounting software do you use? *</label>
                <select
                  id="accountingSoftware"
                  name="accountingSoftware"
                  value={formData.accountingSoftware}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="xero">Xero</option>
                  <option value="quickbooks">QuickBooks</option>
                  <option value="excel">Excel</option>
                  <option value="none">None</option>
                </select>
              </div>

              <h3 className="form-section-title">5. Services Required</h3>
              <fieldset className="form-fieldset form-fieldset--services">
                <legend className="form-legend">
                  Services <span className="form-required-star">*</span>
                </legend>
                <p className="form-hint" id="servicesRequired-hint">
                  Select one service or as many as you need.
                </p>
                <div
                  className="form-options form-options--services-grid"
                  role="group"
                  aria-describedby="servicesRequired-hint"
                >
                  {SERVICE_OPTIONS.map((label) => {
                    const id = `service-${label.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`;
                    const checked = formData.servicesRequired.includes(label);
                    return (
                      <label key={label} className="form-option" htmlFor={id}>
                        <input
                          type="checkbox"
                          id={id}
                          checked={checked}
                          onChange={() => toggleServiceRequired(label)}
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <h3 className="form-section-title">6. Your Requirements</h3>
              <div className="form-group">
                <label htmlFor="requirements">
                  Briefly describe what you need help with or any challenges you&apos;re currently
                  facing *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows="5"
                />
              </div>

              {status.message && !submitted && (
                <div className={`form-status ${status.type}`}>{status.message}</div>
              )}

              <button type="submit" className="btn-primary btn-large" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Your Query'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
