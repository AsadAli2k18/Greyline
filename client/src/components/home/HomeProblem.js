import React from 'react';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import HomeMediaSlot from './HomeMediaSlot';
import './HomeProblem.css';

const points = [
  'Lack of clear and organised financial records',
  'Difficulty understanding your true financial position',
  'Risk of errors, penalties, or missed deadlines',
  'Finance and admin work taking time away from running your business',
];

const HomeProblem = () => {
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
    <section className="home-problem">
      <div className="container">
        <div className="home-problem-inner">
          <div className="home-problem-grid">
            <div
              ref={copyRef}
              className={`home-problem-copy reveal-group ${copyVisible ? 'is-visible' : ''}`}
            >
              <h2 className="section-title reveal-item">Sound familiar?</h2>
              <p className="home-problem-intro reveal-item">
                Many SMEs, sole traders, and growing businesses face the same pressures. If this is
                you, you are not alone, and there is a clearer way forward.
              </p>
              <ul className="home-problem-list">
                {points.map((text) => (
                  <li key={text} className="reveal-item">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div
              ref={mediaRef}
              className={`home-problem-media reveal-group ${mediaVisible ? 'is-visible' : ''}`}
            >
              <div className="reveal-item">
                <HomeMediaSlot src="/images/home/acc1.gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProblem;
