import React from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import './WhyChooseUs.css';

const qualities = [
  {
    icon: '\u{1F3E2}',
    title: 'Built for small business',
    text:
      'We work with SMEs, sole traders, and individuals who need dependable compliance and clear numbers, not jargon.',
  },
  {
    icon: '\u{2699}',
    title: 'Structured delivery',
    text:
      'Agreed scope, realistic timelines, and consistent communication so you know what happens next.',
  },
  {
    icon: '\u{1F3AF}',
    title: 'Practical advice',
    text: 'Recommendations you can act on, aligned to UK rules and your stage of business.',
  },
];

/** Each card observes its own viewport entry (same pattern as process steps on the homepage). */
function QualityCardReveal({ icon, title, text }) {
  const [ref, visible] = useInView(0.1, '0px 0px 12% 0px', USE_IN_VIEW_REPEAT);

  return (
    <div ref={ref} className={`quality-card quality-card--scroll ${visible ? 'is-visible' : ''}`}>
      <div className="quality-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const WhyChooseUs = () => {
  const [titleRef, titleVisible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );
  const [ctaRef, ctaVisible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="why-choose-content">
          <div ref={titleRef} className={`reveal-group ${titleVisible ? 'is-visible' : ''}`}>
            <h2 className="section-title reveal-item">Why choose us</h2>
          </div>
          <div className="qualities-grid">
            {qualities.map((q) => (
              <QualityCardReveal key={q.title} icon={q.icon} title={q.title} text={q.text} />
            ))}
          </div>
          <div ref={ctaRef} className={`reveal-group ${ctaVisible ? 'is-visible' : ''}`}>
            <div className="cta-center reveal-item">
              <Link to="/contact" className="btn-primary btn-large">
                Submit Your Query
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
