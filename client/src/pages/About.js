import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const ACC4_HERO_BG = "url('/images/home/acc4.avif')";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero" style={{ '--acc4-hero-bg': ACC4_HERO_BG }}>
        <div className="container">
          <h1 className="page-title">About Greyline Accountants Ltd.</h1>
          <p className="page-lead">
            We work with SMEs, sole traders, individuals, and growing businesses who want clear numbers,
            reliable compliance, and practical support without the jargon.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container about-grid">
          <div className="about-block">
            <h2>What we do</h2>
            <p>
              From bookkeeping and payroll to tax returns, year-end accounts, and company formation, we
              focus on the core accounting and tax services small businesses and individuals need most. We
              are not an audit firm and we do not position ourselves as a substitute for a full-time CFO.
              We deliver structured, dependable support that keeps you compliant and informed.
            </p>
          </div>
          <div className="about-block">
            <h2>How we work</h2>
            <p>
              Every engagement starts with understanding your situation. We agree scope, timelines, and
              responsibilities up front, then deliver ongoing support so deadlines are met and you always
              know where you stand financially.
            </p>
          </div>
          <div className="about-block">
            <h2>Get in touch</h2>
            <p>
              Whether you need a specific service or are unsure where to start, submit your query and we
              will come back with clear next steps.
            </p>
            <Link to="/contact" className="btn-primary btn-large">
              Submit Your Query
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
