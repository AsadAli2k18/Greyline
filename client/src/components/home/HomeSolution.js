import React from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import HomeMediaSlot from './HomeMediaSlot';
import './HomeSolution.css';

const points = [
  'Structured and accurate financial management',
  'Timely submissions and compliance',
  'Clear reporting for better decision-making',
  'Ongoing support tailored to SMEs, individuals, and sole traders',
];

const HomeSolution = () => {
  const [copyRef, copyVisible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );
  const [mediaRef, mediaVisible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );

  return (
    <section className="home-solution">
      <div className="container">
        <div className="home-solution-inner">
          <div className="home-solution-grid">
            <div
              ref={copyRef}
              className={`home-solution-copy reveal-group ${copyVisible ? 'is-visible' : ''}`}
            >
              <h2 className="section-title reveal-item">How Greyline helps</h2>
              <p className="home-solution-intro reveal-item">
                We focus on practical accounting and tax support, so you can run your business with
                confidence.
              </p>
              <ul className="home-solution-list">
                {points.map((text) => (
                  <li key={text} className="reveal-item">
                    {text}
                  </li>
                ))}
              </ul>
              <div className="cta-center reveal-item">
                <Link to="/contact" className="btn-primary btn-large">
                  Submit Your Query
                </Link>
              </div>
            </div>
            <div
              ref={mediaRef}
              className={`home-solution-media reveal-group ${mediaVisible ? 'is-visible' : ''}`}
            >
              <div className="reveal-item">
                <HomeMediaSlot src="/images/home/acc2.gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSolution;
