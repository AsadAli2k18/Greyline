import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AgencyProfitScoreResults.css';

const AgencyProfitScoreResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scoreData = location.state?.scoreData || {
    totalScore: 65,
    categoryScores: {
      profitVisibility: 72,
      revenuePipeline: 48,
      cashFlow: 80,
      operations: 64,
      aiReadiness: 52
    },
    potentialImpact: 84800
  };
  const userData = location.state?.userData || {};

  const getScoreCategory = (score) => {
    if (score >= 80) return { label: "Highly Structured", color: "#0066cc" };
    if (score >= 60) return { label: "Structured", color: "#0066cc" };
    if (score >= 40) return { label: "Developing", color: "#ffa500" };
    return { label: "Needs Structure", color: "#ff4444" };
  };

  const category = getScoreCategory(scoreData.totalScore);
  const firstName = userData.fullName?.split(' ')[0] || 'there';

  return (
    <div className="profit-score-page">
      <div className="scorecard-container">
        <div className="scorecard-header">
          <h1 className="scorecard-logo">Greyline Accountants Ltd.</h1>
          <p className="scorecard-subtitle">YOUR RESULTS</p>
        </div>

        <div className="scorecard-content">
          <div className="main-score">
            <p className="score-greeting">{firstName}, here's your scorecard</p>
            <div className="score-display">
              <span className="score-percentage">{scoreData.totalScore}%</span>
              <span className="score-label">{category.label}</span>
            </div>
          </div>

          <div className="potential-impact">
            <p className="impact-label">YOUR POTENTIAL ANNUAL IMPACT</p>
            <p className="impact-amount">£{scoreData.potentialImpact.toLocaleString()}</p>
          </div>

          <div className="category-breakdown">
            <h3>CATEGORY BREAKDOWN</h3>
            <div className="category-item">
              <div className="category-header">
                <span>Profit Visibility</span>
                <span>{scoreData.categoryScores.profitVisibility}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scoreData.categoryScores.profitVisibility}%`, backgroundColor: scoreData.categoryScores.profitVisibility >= 60 ? '#0066cc' : '#ffa500' }}></div>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span>Revenue & Pipeline</span>
                <span>{scoreData.categoryScores.revenuePipeline}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scoreData.categoryScores.revenuePipeline}%`, backgroundColor: scoreData.categoryScores.revenuePipeline >= 60 ? '#0066cc' : '#ffa500' }}></div>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span>Cash Flow Management</span>
                <span>{scoreData.categoryScores.cashFlow}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scoreData.categoryScores.cashFlow}%`, backgroundColor: scoreData.categoryScores.cashFlow >= 60 ? '#0066cc' : '#ffa500' }}></div>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span>Operational Efficiency</span>
                <span>{scoreData.categoryScores.operations}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scoreData.categoryScores.operations}%`, backgroundColor: scoreData.categoryScores.operations >= 60 ? '#0066cc' : '#ffa500' }}></div>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span>AI & Automation Readiness</span>
                <span>{scoreData.categoryScores.aiReadiness}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scoreData.categoryScores.aiReadiness}%`, backgroundColor: scoreData.categoryScores.aiReadiness >= 60 ? '#0066cc' : '#ffa500' }}></div>
              </div>
            </div>
          </div>

          <div className="quick-wins">
            <h3>YOUR QUICK WINS</h3>
            <ul>
              <li>Ask your team to track their time for one week - you'll get immediate visibility into project profitability</li>
              <li>List your top 5 clients with revenue and estimated costs to find your most profitable work</li>
              <li>Pick one repetitive task and test an AI tool to handle it - start with invoice processing or data entry</li>
            </ul>
          </div>

          <div className="cta-section">
            <button className="btn-primary btn-large" onClick={() => navigate('/contact')}>
              Get Your Full Report
            </button>
            <p className="cta-note">Submit your query to receive your detailed PDF report</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">100+</div>
          <div className="stat-label">Agencies assessed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">5 min</div>
          <div className="stat-label">Completion time</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">90-day</div>
          <div className="stat-label">Action plan</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Free, no strings</div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfitScoreResults;
