import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './BlogPreview.css';

const BlogPreview = () => {
  const [revealRef, revealVisible] = useInView();

  const blogPosts = [
    {
      id: 1,
      category: "Budget",
      title: "2023 Autumn Statement: What the Budget means for you",
      excerpt: "Understand the 2023 UK Autumn Statement's tax cuts and business enhancements, including NI rate reduction, self-employment tax reforms, and R&D modifications.",
      slug: "2023-autumn-statement"
    },
    {
      id: 2,
      category: "Strategy",
      title: "Outsourced CFO Services: The Secret to Unlocking Financial Success for Digital Creative Agencies",
      excerpt: "A CFO can be a key member of your management team, dedicated to driving the financial affairs and daily operations of the business.",
      slug: "outsourced-cfo-services"
    },
    {
      id: 3,
      category: "Pricing",
      title: "From Price to Value: How Creative Agencies Can Build a More Profitable Business",
      excerpt: "Competing on price leads to narrow profit margins, difficult customers, and financial troubles.",
      slug: "price-to-value"
    }
  ];

  return (
    <section className="blog-preview">
      <div className="container">
        <div
          ref={revealRef}
          className={`blog-preview-reveal reveal-group ${revealVisible ? 'is-visible' : ''}`}
        >
          <div className="blog-header">
            <h2 className="section-title reveal-item">Read our latest insights</h2>
            <p className="section-subtitle reveal-item">
              Looking to stay up-to-date on the latest trends and best practices? Look no further than our blog, where we share valuable insights and expert advice to help you Make More and Keep More.
            </p>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card reveal-item">
                <div className="blog-category">{post.category}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="blog-link">Read more →</span>
              </Link>
            ))}
          </div>

          <div className="cta-center reveal-item">
            <Link to="/blog" className="btn-outline btn-large">
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
