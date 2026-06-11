import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqRef, faqVisible] = useInView();

  const faqs = [
    {
      question: "What does working with Greyline Accountants Ltd. actually look like?",
      answer: "We embed into your agency as your structured finance function. That includes bookkeeping, management reporting, tax strategy and CFO support. You'll have clear monthly visibility and scheduled strategic reviews so finance informs decisions, not just compliance."
    },
    {
      question: "Do you only work with agencies?",
      answer: "Yes. Our entire model is built around the agency model ,  cash flow, delivery capacity, payroll structure and margin management. That focus allows us to provide financial guidance that reflects how agencies actually operate."
    },
    {
      question: "When is the right time to bring in structured financial support?",
      answer: "Typically once revenue is established and headcount decisions begin to carry weight. At that stage, financial visibility becomes critical to protecting margin and managing growth responsibly."
    },
    {
      question: "How involved are you in decision-making?",
      answer: "We provide structured reporting and forward planning to support leadership decisions. Hiring, pricing, tax planning and cash management should be guided by clear financial visibility. Our role is to ensure you have that clarity before major commitments are made."
    },
    {
      question: "What makes Greyline Accountants Ltd. different from a traditional accountant?",
      answer: "Traditional models centre around year-end compliance. Our model centres around embedded financial structure, ongoing oversight and proactive planning. The objective is profitability and cash confidence, not simply filed accounts."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="container">
        <div
          ref={faqRef}
          className={`faq-reveal-inner reveal-group ${faqVisible ? 'is-visible' : ''}`}
        >
          <h2 className="section-title reveal-item">FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item reveal-item">
                <button
                  type="button"
                  className={`faq-question ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
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

export default FAQ;
