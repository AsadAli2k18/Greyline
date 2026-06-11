import React from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import './HowItWorks.css';

const steps = [
  {
    title: 'Submit your query',
    text: 'Tell us what you need through our website enquiry form.',
  },
  {
    title: 'Review of your requirements',
    text: 'We assess your situation and confirm how we can help.',
  },
  {
    title: 'Initial consultation',
    text: 'We gather the information needed to scope the work clearly.',
  },
  {
    title: 'Setup and onboarding',
    text: 'We agree timelines, systems access, and responsibilities.',
  },
  {
    title: 'Ongoing delivery and support',
    text: 'We deliver the agreed services and remain available for questions.',
  },
];

/** Each step observes its own viewport entry for scroll-driven stagger (homepage). */
function ProcessStepReveal({ step, index }) {
  const [ref, visible] = useInView(0.1, '0px 0px 12% 0px', USE_IN_VIEW_REPEAT);

  return (
    <div
      ref={ref}
      className={`process-step process-step--reveal ${visible ? 'is-visible' : ''}`}
    >
      <div className="step-number">{index + 1}</div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </div>
  );
}

const HowItWorks = () => {
  const [processRef, processVisible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );

  return (
    <section className="how-it-works how-it-works--process-only">
      <div className="container">
        <div
          ref={processRef}
          className={`process-section reveal-group ${processVisible ? 'is-visible' : ''}`}
        >
          <h2 className="section-title reveal-item">Our process</h2>
          <p className="process-intro reveal-item">
            The same straightforward journey applies whether you need bookkeeping, tax returns, payroll,
            or several services together.
          </p>
          <div className="process-steps">
            {steps.map((step, index) => (
              <ProcessStepReveal key={step.title} step={step} index={index} />
            ))}
          </div>
          <div className="cta-center reveal-item">
            <Link to="/contact" className="btn-primary btn-large">
              Submit Your Query
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
