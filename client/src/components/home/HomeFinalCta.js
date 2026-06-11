import React from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import './HomeFinalCta.css';

const HomeFinalCta = () => {
  const [ref, visible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );

  return (
    <section className="home-final-cta" aria-labelledby="home-final-cta-heading">
      <div className="home-final-cta-bg" aria-hidden="true" />
      <div className="container">
        <div
          ref={ref}
          className={`home-final-cta-inner reveal-group ${visible ? 'is-visible' : ''}`}
        >
          <div className="home-final-cta-panel">
            <span className="home-final-cta-eyebrow reveal-item">Get in touch</span>
            <h2 id="home-final-cta-heading" className="home-final-cta-title section-title reveal-item">
              How can we help?
            </h2>
            <p className="home-final-cta-text reveal-item">
              Tell us about your business and what you need. We will review your query and respond
              with clear next steps.
            </p>
            <div className="home-final-cta-actions reveal-item">
              <Link to="/contact" className="btn-primary btn-large home-final-cta-btn">
                Submit Your Query
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCta;
