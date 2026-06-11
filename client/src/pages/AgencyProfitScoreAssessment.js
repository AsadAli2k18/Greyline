import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AgencyProfitScoreAssessment.css';

const AgencyProfitScoreAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || {};
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to get-started if no user data
  useEffect(() => {
    if (!userData || !userData.fullName) {
      navigate('/agency-profit-score/get-started');
    }
  }, [userData, navigate]);

  const questions = [
    {
      id: 1,
      question: "How often do you review your financial reports?",
      options: ["Daily", "Weekly", "Monthly", "Quarterly", "Rarely"]
    },
    {
      id: 2,
      question: "Do you have real-time visibility into your cash flow?",
      options: ["Yes, always", "Mostly", "Sometimes", "Rarely", "Never"]
    },
    {
      id: 3,
      question: "How confident are you in your profit margins?",
      options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not confident at all"]
    },
    {
      id: 4,
      question: "Do you track time spent on client projects?",
      options: ["Yes, always", "Mostly", "Sometimes", "Rarely", "Never"]
    },
    {
      id: 5,
      question: "How do you make hiring decisions?",
      options: ["Based on clear financial data", "Based on gut feeling and data", "Mostly gut feeling", "Based on immediate need", "I'm not sure"]
    },
    {
      id: 6,
      question: "Do you have a clear pricing strategy?",
      options: ["Yes, well-defined", "Somewhat defined", "Basic strategy", "Informal approach", "No strategy"]
    },
    {
      id: 7,
      question: "How often do you receive financial guidance from your accountant?",
      options: ["Weekly", "Monthly", "Quarterly", "Annually", "Only when I ask"]
    },
    {
      id: 8,
      question: "Do you use cloud accounting software?",
      options: ["Yes, fully integrated", "Yes, basic use", "Partially", "No, but planning to", "No"]
    },
    {
      id: 9,
      question: "How clear is your revenue pipeline?",
      options: ["Very clear, 12+ months", "Clear, 6-12 months", "Somewhat clear, 3-6 months", "Unclear, less than 3 months", "No visibility"]
    },
    {
      id: 10,
      question: "Do you have automated financial reporting?",
      options: ["Yes, fully automated", "Mostly automated", "Partially automated", "Manual", "No reporting"]
    },
    {
      id: 11,
      question: "How do you track project profitability?",
      options: ["Real-time tracking", "Monthly reviews", "Quarterly reviews", "Annual reviews", "Don't track"]
    },
    {
      id: 12,
      question: "Do you have a financial forecast?",
      options: ["Yes, detailed 12+ months", "Yes, 6-12 months", "Yes, 3-6 months", "Basic forecast", "No forecast"]
    },
    {
      id: 13,
      question: "How often do you analyze your top clients?",
      options: ["Monthly", "Quarterly", "Semi-annually", "Annually", "Never"]
    },
    {
      id: 14,
      question: "Do you have clear financial KPIs?",
      options: ["Yes, well-defined", "Some KPIs", "Basic metrics", "Informal tracking", "No KPIs"]
    },
    {
      id: 15,
      question: "How proactive is your financial management?",
      options: ["Very proactive", "Somewhat proactive", "Reactive", "Very reactive", "Passive"]
    },
    {
      id: 16,
      question: "Do you use AI or automation tools for finance?",
      options: ["Yes, extensively", "Yes, some tools", "Planning to", "Considering", "No"]
    },
    {
      id: 17,
      question: "How clear is your cash flow forecast?",
      options: ["Very clear, 12+ months", "Clear, 6-12 months", "Somewhat clear, 3-6 months", "Unclear", "No forecast"]
    },
    {
      id: 18,
      question: "Do you have structured financial reviews?",
      options: ["Yes, regular structured reviews", "Yes, informal reviews", "Occasionally", "Rarely", "Never"]
    },
    {
      id: 19,
      question: "How confident are you in your tax planning?",
      options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not confident"]
    },
    {
      id: 20,
      question: "Do your financial numbers guide your business decisions?",
      options: ["Always", "Mostly", "Sometimes", "Rarely", "Never"]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await submitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/agency-profit-score', {
        answers: answers,
        userData: userData,
        timestamp: new Date().toISOString()
      });
      
      // Navigate to results page with score data
      navigate('/agency-profit-score/results', { 
        state: { 
          scoreData: response.data,
          userData: userData
        } 
      });
    } catch (error) {
      console.error('Error submitting assessment:', error);
      // Calculate score locally if API fails
      const calculatedScore = calculateScore(answers);
      navigate('/agency-profit-score/results', { 
        state: { 
          scoreData: calculatedScore,
          userData: userData
        } 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = (answers) => {
    // Simple scoring algorithm
    let totalScore = 0;
    const categoryScores = {
      profitVisibility: 0,
      revenuePipeline: 0,
      cashFlow: 0,
      operations: 0,
      aiReadiness: 0
    };

    // Map questions to categories and calculate scores
    const categoryMapping = {
      1: 'profitVisibility', 3: 'profitVisibility', 11: 'profitVisibility',
      9: 'revenuePipeline', 12: 'revenuePipeline', 13: 'revenuePipeline',
      2: 'cashFlow', 17: 'cashFlow', 4: 'cashFlow',
      5: 'operations', 8: 'operations', 10: 'operations', 18: 'operations',
      16: 'aiReadiness', 15: 'aiReadiness', 19: 'aiReadiness'
    };

    Object.keys(answers).forEach(qId => {
      const category = categoryMapping[qId] || 'operations';
      const answerIndex = questions.find(q => q.id === parseInt(qId))?.options.indexOf(answers[qId]) || 2;
      const score = (4 - answerIndex) * 20; // Convert to 0-80 scale
      categoryScores[category] += score;
    });

    // Calculate averages
    Object.keys(categoryScores).forEach(cat => {
      const count = Object.keys(categoryMapping).filter(k => categoryMapping[k] === cat).length;
      categoryScores[cat] = Math.round(categoryScores[cat] / count);
    });

    // Calculate overall score
    totalScore = Math.round(
      (categoryScores.profitVisibility + 
       categoryScores.revenuePipeline + 
       categoryScores.cashFlow + 
       categoryScores.operations + 
       categoryScores.aiReadiness) / 5
    );

    return {
      totalScore,
      categoryScores,
      potentialImpact: Math.round(totalScore * 1300) // Example calculation
    };
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (!userData || !userData.fullName) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="assessment-page">
      <div className="assessment-container">
        <div className="assessment-header">
          <div className="header-logo">
            <h1 className="logo-text">Greyline Accountants Ltd.</h1>
            <p className="logo-subtitle">AGENCY PROFIT SCORE™</p>
          </div>
        </div>

        <div className="assessment-content">
          <div className="left-section">
            <div className="promo-badge">FREE 5-MINUTE ASSESSMENT</div>
            <h2 className="main-headline">Stop Guessing Where Your Agency Is Leaking Profit</h2>
            <p className="description">
              Answer 20 quick questions and get an instant, personalised report showing exactly where your agency's finances are strong ,  and where you're leaving money on the table.
            </p>
            <button 
              className="btn-primary btn-large"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id] || isSubmitting}
            >
              {isSubmitting ? 'Calculating...' : currentStep === questions.length - 1 ? 'Get Your Free Profit Score' : 'Next Question'}
            </button>
            <p className="info-text">Takes 5 minutes • No financials needed • Instant PDF report</p>
          </div>

          <div className="right-section">
            <div className="question-card">
              <div className="progress-indicator">
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="progress-text">Question {currentStep + 1} of {questions.length}</span>
              </div>

              <h3 className="question-text">{currentQuestion.question}</h3>

              <div className="options-list">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="question-navigation">
                {currentStep > 0 && (
                  <button className="btn-secondary" onClick={handlePrevious}>
                    Previous
                  </button>
                )}
                <div className="spacer"></div>
                {answers[currentQuestion.id] && (
                  <button className="btn-primary" onClick={handleNext} disabled={isSubmitting}>
                    {isSubmitting ? 'Calculating...' : currentStep === questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfitScoreAssessment;
