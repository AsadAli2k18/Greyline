import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AgencyProfitScorePage.css';

const AgencyProfitScore = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also ensure document is scrolled to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does the scorecard take?",
      answer: "The assessment takes under 5 minutes to complete. You'll answer 20 quick multiple-choice questions about your agency's practices."
    },
    {
      question: "Is it really free?",
      answer: "Yes, completely free. No payment details required. You'll get your full scorecard, personalized report, and 90-day action plan at no cost."
    },
    {
      question: "What happens with my data?",
      answer: "Your data is 100% confidential. We use it only to generate your personalized report and will never share it with third parties. See our Privacy Policy for details."
    },
    {
      question: "Who is this for?",
      answer: "This is designed specifically for agency founders and leaders who want clarity on their financial health. It's most valuable for agencies with established revenue and a team."
    },
    {
      question: "What do I get at the end?",
      answer: "You'll receive an instant scorecard showing your performance across 5 key areas, a personalized PDF report with your financial impact estimate, priority actions, and a 90-day roadmap sent to your inbox."
    },
    {
      question: "Do I need to prepare anything?",
      answer: "No preparation needed. The questions are about your practices and processes, not your financial numbers. Just answer honestly about how your agency operates."
    },
    {
      question: "Can I retake the scorecard?",
      answer: "Yes, you can retake the assessment at any time. This is especially useful if you've made changes to your financial processes and want to see your updated score."
    }
  ];

  return (
    <div className="agency-profit-score-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <h1 className="logo-main">Greyline Accountants Ltd.</h1>
              <p className="logo-subtitle">AGENCY PROFIT SCORE™</p>
            </div>
            
            <div className="hero-main">
              <div className="hero-left">
                <h2 className="hero-headline">Stop Guessing Where Your Agency Is Leaking Profit</h2>
                <p className="hero-description">
                  Answer 20 quick questions and get an instant, personalised report showing exactly where your agency's finances are strong ,  and where you're leaving money on the table.
                </p>
                <Link to="/agency-profit-score/get-started" className="btn-primary btn-hero">
                  Get Your Free Profit Score
                </Link>
                <p className="hero-info">Takes 5 minutes · No financials needed · Instant PDF report</p>
              </div>
              
              <div className="hero-right">
                <div className="scorecard-preview">
                  <div className="preview-header">
                    <span className="preview-logo">Greyline Accountants Ltd.</span>
                    <span className="preview-subtitle">YOUR RESULTS</span>
                  </div>
                  <div className="preview-score">
                    <p className="preview-greeting">Sarah, here's your score!</p>
                    <div className="preview-percentage">63%</div>
                    <div className="preview-label">Structured</div>
                  </div>
                  <div className="preview-impact">
                    <div className="preview-impact-label">YOUR POTENTIAL ANNUAL IMPACT</div>
                    <div className="preview-impact-amount">£84,800</div>
                  </div>
                  <div className="preview-categories">
                    <div className="preview-category">
                      <span>Profit Visibility</span>
                      <span>72%</span>
                    </div>
                    <div className="preview-category">
                      <span>Revenue & Pipeline</span>
                      <span>48%</span>
                    </div>
                    <div className="preview-category">
                      <span>Cash Flow</span>
                      <span>80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uncover Hidden Gaps Section */}
      <section className="gaps-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">WHAT YOU'LL DISCOVER</span>
            <h2 className="section-title">Uncover the Hidden Gaps Holding Your Agency Back</h2>
            <p className="section-description">
              Most agency founders know something isn't right with their finances, but can't pinpoint exactly what. The Agency Profit Score™ diagnoses your blind spots across five critical areas.
            </p>
          </div>

          <div className="gaps-grid">
            <div className="gap-item">
              <h3 className="gap-title">See Where Your Margins Are Really Going</h3>
              <blockquote className="gap-quote">"We're busy but not sure we're actually profitable"</blockquote>
              <p className="gap-text">Understand which clients and projects are driving profit ,  and which are quietly draining it.</p>
            </div>
            <div className="gap-item">
              <h3 className="gap-title">Diagnose Cash Flow Leaks & Revenue Risks</h3>
              <blockquote className="gap-quote">"Cash is always tight even though revenue looks healthy"</blockquote>
              <p className="gap-text">Identify why healthy revenue doesn't always mean healthy cash, and spot concentration risks before they bite.</p>
            </div>
            <div className="gap-item">
              <h3 className="gap-title">Find the Operational Bottlenecks Slowing Growth</h3>
              <blockquote className="gap-quote">"I'm stuck in the day-to-day and can't step back"</blockquote>
              <p className="gap-text">Pinpoint where manual processes, scope creep, and low utilisation are holding your agency back.</p>
            </div>
          </div>

          <div className="section-cta">
            <Link to="/agency-profit-score/get-started" className="btn-primary">
              Find Your Blind Spots
            </Link>
          </div>
        </div>
      </section>

      {/* Scored Across Pillars Section */}
      <section className="pillars-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">5 KEY AREAS</span>
            <h2 className="section-title">Scored Across the Pillars That Drive Agency Profitability</h2>
            <p className="section-description">
              Each category is scored independently and benchmarked against agencies in your revenue bracket.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon">📊</div>
              <h3 className="pillar-title">Profit Visibility</h3>
              <p className="pillar-description">Margins, project costs, and client profitability.</p>
              <p className="pillar-question">Do you know the gross margin on each active client?</p>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">🔽</div>
              <h3 className="pillar-title">Revenue & Pipeline</h3>
              <p className="pillar-description">Forecasting, sales pipeline, and recurring income.</p>
              <p className="pillar-question">Is more than 40% of your revenue from a single client?</p>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">💰</div>
              <h3 className="pillar-title">Cash Flow</h3>
              <p className="pillar-description">Cash visibility, debtor days, and reserves.</p>
              <p className="pillar-question">Do you know your debtor days and have a collections process?</p>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">⚙️</div>
              <h3 className="pillar-title">Operations</h3>
              <p className="pillar-description">Utilisation, scope control, and automation.</p>
              <p className="pillar-question">What percentage of your team's time is billable?</p>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">🤖</div>
              <h3 className="pillar-title">AI Readiness</h3>
              <p className="pillar-description">AI adoption, automation, and team preparedness.</p>
              <p className="pillar-question">Has your team adopted AI tools for day-to-day work?</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps Section */}
      <section className="steps-section">
        <div className="container">
          <h2 className="steps-title">Your Score in 3 Simple Steps</h2>
          <p className="steps-description">No spreadsheets. No number-crunching. Just honest answers about how your agency runs.</p>

          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Answer 20 Questions</h3>
              <p className="step-text">Quick multiple-choice about your practices ,  not your numbers. Under 5 minutes.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">Get Your Score Instantly</h3>
              <p className="step-text">See how you rate across all 5 categories, benchmarked against agencies at your revenue level.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Receive Your PDF Report</h3>
              <p className="step-text">A personalised report with your financial impact estimate, priority actions, and a 90-day roadmap ,  sent to your inbox.</p>
            </div>
          </div>

          <div className="steps-cta">
            <Link to="/agency-profit-score/get-started" className="btn-primary btn-large">
              Start Your Assessment
            </Link>
            <p className="steps-note">Free. No payment details required.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">COMMON QUESTIONS</span>
            <h2 className="section-title">Questions Agency Founders Ask</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${openFaq === index ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <h2 className="final-cta-title">Your Agency's Financial Health Check Is 5 Minutes Away</h2>
          <p className="final-cta-description">
            Join 100+ agency founders who've uncovered their blind spots. Get your personalised score, benchmarks, and 90-day action plan ,  completely free.
          </p>
          <Link to="/agency-profit-score/get-started" className="btn-primary btn-large">
            Get Your Free Profit Score
          </Link>
          <p className="final-cta-note">No payment required · Instant results · 100% confidential</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="score-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">Greyline Accountants Ltd.</div>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms</Link>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Greyline Accountants Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgencyProfitScore;
