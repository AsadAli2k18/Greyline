import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getServiceBySlug, processSteps } from '../data/servicePages';
import './ServiceDetail.css';

/* Hero only: public/images/home/acc4.avif */
const SERVICE_HERO_BG = "url('/images/home/acc4.avif')";

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-detail-page">
      <section className="service-hero" style={{ '--service-hero-bg': SERVICE_HERO_BG }}>
        <div className="container">
          <span className="eyebrow">{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.heroDescription}</p>
          <Link to="/contact" className="btn-primary btn-large">
            Submit Your Query
          </Link>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <h2>The challenges</h2>
          <ul className="service-list">
            {service.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <h2>How we help</h2>
          <ul className="service-list">
            {service.solutions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <h2>What&apos;s included</h2>
          <ul className="service-list">
            {service.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <h2>Who it&apos;s for</h2>
          <ul className="service-list">
            {service.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <h2>How the service works</h2>
          <div className="service-process">
            {processSteps.map((step, index) => (
              <div key={step.title} className="service-process-step">
                <div className="num">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta-bar">
        <div className="container">
          <p>Ready to get started? Tell us what you need.</p>
          <Link to="/contact" className="btn-primary btn-large">
            Submit Your Query
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
