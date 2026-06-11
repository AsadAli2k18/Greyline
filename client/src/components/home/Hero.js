import React from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_HERO_IN_VIEW_ROOT_MARGIN,
  HOME_HERO_IN_VIEW_THRESHOLD,
} from '../../hooks/useInView';
import './Hero.css';

/* Banner asset: public/images/home/acc3.avif */
const HERO_BANNER_BG = "url('/images/home/acc3.avif')";

const Hero = () => {
  const [ref, visible] = useInView(HOME_HERO_IN_VIEW_THRESHOLD, HOME_HERO_IN_VIEW_ROOT_MARGIN);

  return (
    <section className="hero" style={{ '--hero-bg-image': HERO_BANNER_BG }}>
      <div className="container hero-inner">
        <div ref={ref} className={`hero-content reveal-group ${visible ? 'is-visible' : ''}`}>
          <h1 className="hero-title reveal-item">
            Accounting and tax support for SMEs, sole traders, and individuals
          </h1>
          <p className="hero-subtitle reveal-item">
            Clear records, compliant filings, and practical advice, so you can focus on running and
            growing your business.
          </p>
          <div className="hero-cta reveal-item">
            <Link to="/contact" className="btn-primary btn-large">
              Submit Your Query
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
