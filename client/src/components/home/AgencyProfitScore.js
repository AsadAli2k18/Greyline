import React from 'react';
import { Link } from 'react-router-dom';
import './AgencyProfitScore.css';

const AgencyProfitScore = () => {
  return (
    <section className="profit-score">
      <div className="container">
        <div className="profit-score-wrapper">
          <div className="profit-score-left">
            <h2 className="section-title">Take The Agency Profit Score™</h2>
            <p className="section-subtitle">
              Free score and personalised report in under 5 minutes
            </p>
            <Link to="/agency-profit-score" className="btn-primary btn-large">
              GET YOUR SCORE
            </Link>
            <div className="decorative-dots decorative-dots-bottom-left"></div>
          </div>
          
          <div className="profit-score-right">
            <div className="scorecard-preview">
              <div className="scorecard-header">
                <span className="scorecard-logo">Greyline Accountants Ltd.</span>
                <span className="scorecard-label">YOUR RESULTS</span>
              </div>
              <div className="scorecard-content">
                <p className="scorecard-greeting">Sarah, here's your scorecard</p>
                <div className="scorecard-score">
                  <div className="score-percentage">63%</div>
                  <div className="score-label">Structured</div>
                </div>
                <div className="scorecard-impact">
                  <div className="impact-label">YOUR POTENTIAL ANNUAL IMPACT</div>
                  <div className="impact-amount">£84,800</div>
                  <div className="impact-note">Based on your work week and 10-day day</div>
                </div>
                <div className="scorecard-breakdown">
                  <div className="breakdown-label">CATEGORY BREAKDOWN</div>
                  <div className="breakdown-item">
                    <span className="breakdown-name">Profit Visibility</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{ width: '72%' }}></div>
                    </div>
                    <span className="breakdown-percentage">72%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-name">Revenue & Pipeline</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{ width: '68%' }}></div>
                    </div>
                    <span className="breakdown-percentage">68%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-name">Cash Flow Management</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill breakdown-fill-light" style={{ width: '40%' }}></div>
                    </div>
                    <span className="breakdown-percentage">40%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-name">Operational Efficiency</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill breakdown-fill-orange" style={{ width: '46%' }}></div>
                    </div>
                    <span className="breakdown-percentage">46%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-name">AI & Automation Readiness</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill breakdown-fill-orange" style={{ width: '52%' }}></div>
                    </div>
                    <span className="breakdown-percentage">52%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="decorative-dots decorative-dots-top-right"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyProfitScore;
