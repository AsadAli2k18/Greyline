import React from 'react';
import { Link } from 'react-router-dom';
import { getAllServices, servicesNavGroups } from '../data/servicePages';
import './ServicesHub.css';

const Services = () => {
  const services = getAllServices();

  return (
    <div className="services-hub-page">
      <section className="services-hub-hero">
        <div className="container">
          <h1 className="page-title">Our services</h1>
          <p className="page-lead">
            Dedicated pages for each service, choose what you need and read more, or submit your query and
            we will guide you.
          </p>
          <Link to="/contact" className="btn-primary btn-large">
            Submit Your Query
          </Link>
        </div>
      </section>

      <section className="services-hub-content">
        <div className="container">
          {servicesNavGroups.map((group) => (
            <div key={group.label} className="services-hub-group">
              <h2 className="services-hub-group-title">{group.label}</h2>
              <div className="services-hub-grid">
                {group.items.map((item) => {
                  const full = services.find((s) => s.slug === item.slug);
                  return (
                    <Link key={item.slug} to={`/services/${item.slug}`} className="services-hub-card">
                      {full?.icon && <span className="services-hub-card-icon" aria-hidden>{full.icon}</span>}
                      <h3>{item.title}</h3>
                      <p>{full?.heroDescription?.slice(0, 120)}
                        {(full?.heroDescription?.length || 0) > 120 ? '…' : ''}</p>
                      <span className="services-hub-card-link">Learn more</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
