import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data.testimonials);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([
          {
            id: 1,
            name: "Oliver L",
            company: "Authority Agency",
            role: "CEO",
            text: "We've always got the information we need to make decisions quickly ... We've saved £10k in taxes since working with Greyline Accountants Ltd. They're not your usual accountant."
          },
          {
            id: 2,
            name: "Oren G",
            company: "Kurve",
            role: "Managing Director",
            text: "Rayhaan and his team have been the ideal and stack up as the top partner we've worked with on finance matters over our 14 years in business."
          },
          {
            id: 3,
            name: "Phaibion R",
            company: "Royal Energy",
            role: "CEO",
            text: "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result."
          },
          {
            id: 4,
            name: "Lauren H",
            company: "LBHPT",
            role: "Founder",
            text: "Greyline Accountants Ltd. takes the stress out of taxes and deals with it all in a professional and timely manner. Rayhaan is an expert at what he does and I'm grateful I found such a great company to look after my taxes for the foreseeable future"
          },
          {
            id: 5,
            name: "Dean C",
            company: "Latte",
            role: "Founder",
            text: "Working with Rayhaan & the team has been phenomenal. I've got clarity around my numbers and what they mean for my business. I've saved tax, and I've been guided towards what's best for me and my goals."
          }
        ]);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="testimonials">
        <div className="container">
          <div className="loading">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div
          ref={headerRef}
          className={`testimonials-header reveal-group ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="section-title reveal-item">Building an agency is tough.</h2>
          <p className="section-subtitle reveal-item">
            We're grateful to our clients for the trust, loyalty and confidence placed in us over the years. Don't take our word for it though, here's what they're saying.
          </p>
          <Link to="/contact" className="btn-primary btn-large reveal-item">
            Submit Your Query
          </Link>
        </div>

        <div
          ref={gridRef}
          className={`testimonials-grid reveal-group ${gridVisible ? 'is-visible' : ''}`}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card reveal-item">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                {testimonial.role && <span>{testimonial.role}</span>}
                <span className="company">{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
