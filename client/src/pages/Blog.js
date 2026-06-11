import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      category: "Budget",
      title: "2023 Autumn Statement: What the Budget means for you",
      excerpt: "Understand the 2023 UK Autumn Statement's tax cuts and business enhancements, including NI rate reduction, self-employment tax reforms, and R&D modifications.",
      date: "November 2023",
      slug: "2023-autumn-statement"
    },
    {
      id: 2,
      category: "Strategy",
      title: "Strategic Finance Partner: Unlocking Financial Success for Digital Creative Agencies",
      excerpt: "A strategic finance partner goes beyond compliance to help you understand profitability, cash flow and where your agency can grow next.",
      date: "October 2023",
      slug: "outsourced-cfo-services"
    },
    {
      id: 3,
      category: "Pricing",
      title: "From Price to Value: How Creative Agencies Can Build a More Profitable Business",
      excerpt: "Competing on price leads to narrow profit margins, difficult customers, and financial troubles.",
      date: "September 2023",
      slug: "price-to-value"
    }
  ];

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1 className="page-title">Insights & Blog</h1>
          <p className="page-subtitle">
            Stay up-to-date on the latest trends and best practices in accounting and finance
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-category">{post.category}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-link">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
