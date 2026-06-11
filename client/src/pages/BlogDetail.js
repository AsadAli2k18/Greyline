import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();

  const blogPosts = {
    '2023-autumn-statement': {
      id: 1,
      slug: '2023-autumn-statement',
      category: "Budget",
      title: "2023 Autumn Statement: What the Budget means for you",
      author: "Rayhaan Moughal",
      date: "23.11.2023",
      heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
      content: {
        introduction: "The 2023 Autumn Statement was presented as a plan to ease the tax burden and stimulate growth, but the real impact depends on your specific situation. At Greyline Accountants Ltd, we've broken down the main announcements and what they are likely to mean in practice for our clients and other UK business owners.",
        keyAnnouncements: [
          "Class 1 National Insurance is set to fall from 12% to 10% from January 2024.",
          "For the self-employed, Class 2 NIC will be removed and Class 4 NIC will drop from 9% to 8% from April 2024.",
          "The National Living Wage will rise to £11.44 per hour from April 2024.",
          "Full Capital Expensing will be made a permanent feature of the UK tax system.",
          "Adjustments are being made to the R&D relief regime and qualifying criteria.",
          "Tax thresholds are frozen rather than increased with inflation."
        ],
        details: {
          nationalInsurance: {
            title: "What’s changing with National Insurance?",
            content: "Class 1 National Insurance Contributions will be reduced from 12% to 10% from January 2024. For many employees and director‑shareholders this should translate into a modest but welcome increase in take‑home pay."
          },
          selfEmployment: {
            title: "NIC changes for the self‑employed",
            content: "Self‑employed individuals will no longer pay Class 2 NIC, and Class 4 NIC will fall from 9% to 8% from April 2024. Together these changes should deliver a meaningful saving for freelancers and sole traders."
          },
          livingWage: {
            title: "Higher National Living Wage",
            content: "The National Living Wage is scheduled to increase to £11.44 per hour from April 2024. Employees on lower incomes will benefit, but employers should begin planning now for the additional payroll costs this will create."
          },
          capitalExpensing: {
            title: "Full Capital Expensing becomes permanent",
            content: "Full Capital Expensing, first introduced in the Spring Budget 2023, will now become a permanent fixture. Businesses investing in qualifying plant and machinery can continue to claim 100% relief upfront, helping to reduce corporation tax bills where investment is planned."
          },
          rnd: {
            title: "Updates to R&D tax relief",
            content: "The government intends to merge the existing RDEC and SME R&D schemes into a single regime from April 2024. The threshold for being classed as R&D intensive is also being lowered from 40% to 30% of qualifying expenditure, which should bring more innovative businesses into scope."
          },
          taxThresholds: {
            title: "Frozen tax thresholds",
            content: "Income tax thresholds are being held at their current levels in spite of elevated inflation. As wages rise, more people are likely to move into higher bands, which can feel like a stealth tax increase over time."
          }
        },
        accountantsView: "From our perspective at Greyline Accountants Ltd, the Statement offers some helpful tweaks but falls short of a transformational package for growing businesses. Careful planning around remuneration, investment and R&D will be key to making the most of the available reliefs.",
        furtherInfo: "You can read the full Autumn Statement and supporting documents on the UK government's website.",
        guidance: "This article provides a general overview only and shouldn’t be taken as personal tax advice. If you’d like to discuss how the changes affect you or your business, please email us at info@greylineaccountants.co.uk."
      }
    },
    'outsourced-cfo-services': {
      id: 2,
      slug: 'outsourced-cfo-services',
      category: "Strategy",
      title: "Strategic Finance Partner: Unlocking Financial Success for Digital Creative Agencies",
      author: "Rayhaan Moughal",
      date: "16.03.23",
      heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
      content: {
        introduction: "Modern Chief Financial Officers do far more than sign off the numbers. In fast‑moving digital and creative businesses, the CFO role has evolved into a strategic partner who helps shape direction, profitability and cash flow. For many agencies, bringing in that level of experience on a full‑time basis isn’t realistic, which is where an outsourced or fractional CFO can be an effective alternative.",
        sections: [
          {
            title: "Deeper financial insight",
            content: "A good CFO looks beyond the basic P&L to understand how work, pricing and delivery really translate into profit. With an outsourced CFO on your side, you gain regular insight into cash flow, margins and forecasting that supports better day‑to‑day and board‑level decisions."
          },
          {
            title: "Senior expertise without the full‑time cost",
            content: "Hiring an in‑house CFO is a major commitment in salary and benefits. Outsourced CFO services give you access to a senior finance leader when you need them, at a fraction of the cost of a permanent hire, so smaller and growing agencies can still benefit from high‑level advice."
          },
          {
            title: "Support that flexes with your agency",
            content: "Because an outsourced CFO typically works on a part‑time or project basis, the level of involvement can scale up or down as your agency changes. This flexibility is particularly useful around busy seasons, funding rounds or major strategic shifts."
          },
          {
            title: "An objective outside viewpoint",
            content: "An external CFO is slightly removed from internal politics and history. That distance makes it easier for them to challenge assumptions, ask difficult questions about pricing or resourcing, and give honest feedback on the financial implications of key decisions."
          },
          {
            title: "Building strong financial systems",
            content: "Beyond strategy, an outsourced CFO can help you put in place the processes, controls and reporting that keep your numbers reliable. This solid financial foundation reduces risk, improves compliance and frees your internal team from firefighting."
          },
          {
            title: "Freeing leaders to focus on growth",
            content: "When a finance expert is monitoring the numbers, agency founders and directors can spend more time on clients, creative work and new opportunities. That shift in focus is often where the real value of outsourced CFO support is felt."
          }
        ],
        conclusion: "For digital creative agencies that want to grow with confidence, an outsourced CFO can bridge the gap between basic compliance and proactive financial leadership. By pairing strategic insight with flexible support, they help you make better decisions, protect cash and build a business that’s set up for long‑term success."
      }
    },
    'price-to-value': {
      id: 3,
      slug: 'price-to-value',
      category: "Pricing",
      title: "From Price to Value: How Creative Agencies Can Build a More Profitable Business",
      author: "Rayhaan Moughal",
      date: "16.03.23",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      content: {
        introduction: "We regularly meet creative agencies that win work by being the cheapest option. It can feel like the quickest route to filling the studio, but over time it usually leads to thin margins, overworked teams and constant pressure on cash. In this piece we look at why competing on price is so risky and how to reposition your services around the value you deliver instead.",
        sections: [
          {
            title: "Should you ever cut your prices?",
            content: "For most agencies, discounting should be the exception rather than the rule. The creative industry is not set up for a sustainable cost advantage, so racing to the bottom on price typically results in tight margins and stressful client relationships. A better approach is to refine your offer and clearly explain the outcomes clients get for the fee you charge."
          },
          {
            title: "Avoiding the \"vampire\" client",
            content: "Every agency has encountered clients who drain time, energy and profit. They negotiate hard, expect constant changes and often pay the lowest fees. By anchoring your positioning around value, you naturally attract clients who care more about results than rock‑bottom prices, and who are more likely to respect your process and boundaries."
          },
          {
            title: "Set your pricing tone early",
            content: "It’s tempting in the early days to under‑charge just to get work through the door, but that habit can be difficult to undo. Once the market sees you as the budget option, lifting prices later becomes a much bigger challenge. Starting with a value‑based mindset, even with a smaller roster of clients, creates space for healthier pricing as you grow."
          },
          {
            title: "Measure what really matters",
            content: "Headline metrics like number of clients or projects can be misleading. Instead, focus on measures that tie to profitability, such as average project value, utilisation, client lifetime value and net profit margin. These numbers tell you whether lower prices are genuinely helping or quietly eroding the financial health of your agency."
          },
          {
            title: "Make value visible in your sales process",
            content: "If you want clients to pay more, they need to clearly see what they’re getting. That means linking your work to business outcomes, sharing case studies and results, and talking about the problems you solve rather than the hours you sell. When value is front and centre, price becomes one part of the decision rather than the only factor."
          },
          {
            title: "Finding your sweet spot on price",
            content: "Optimal pricing is discovered, not guessed. Start by understanding your cost base and the level of profit you need, then test different price points, packaging and retainers. Over time, this experimentation will reveal where clients are still happy to buy and your agency can earn a fair, sustainable margin."
          }
        ],
        summary: [
          "Competing purely on price is rarely a long‑term strategy for creative agencies; it squeezes margins, encourages demanding clients and makes investment in your team harder.",
          "By focusing on the value you create, tracking the right financial metrics and steadily testing your pricing, you can move away from discounting and build a more resilient, profitable agency."
        ]
      }
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="blog-not-found">
            <h1>Blog Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <article className="blog-article">
        <div className="blog-article-header">
          <div className="container">
            <div className="blog-category-tag">{post.category}</div>
            <h1 className="blog-article-title">{post.title}</h1>
          </div>
        </div>

        <div className="blog-article-hero">
          <img src={post.heroImage} alt={post.title} />
        </div>

        <div className="blog-article-content">
          <div className="container">
            <div className="article-body">
              <p className="article-intro">{post.content.introduction}</p>

              {post.content.keyAnnouncements && (
                <>
                  <h2>Key Announcements</h2>
                  <ul className="announcements-list">
                    {post.content.keyAnnouncements.map((announcement, index) => (
                      <li key={index}>{announcement}</li>
                    ))}
                  </ul>
                </>
              )}

              {post.content.details && (
                <>
                  <h2>The Details</h2>
                  {Object.values(post.content.details).map((detail, index) => (
                    <div key={index} className="detail-section">
                      <h3>{detail.title}</h3>
                      <p>{detail.content}</p>
                    </div>
                  ))}
                </>
              )}

              {post.content.sections && (
                <>
                  {post.content.sections.map((section, index) => (
                    <div key={index} className="content-section">
                      <h2>{section.title}</h2>
                      <p>{section.content}</p>
                    </div>
                  ))}
                </>
              )}

              {post.content.accountantsView && (
                <>
                  <h2>Accountants View</h2>
                  <p>{post.content.accountantsView}</p>
                </>
              )}

              {post.content.summary && (
                <>
                  <h2>Summary</h2>
                  {post.content.summary.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </>
              )}

              {post.content.conclusion && (
                <p className="article-conclusion">{post.content.conclusion}</p>
              )}

              {post.content.furtherInfo && (
                <div className="article-footer-info">
                  <p><strong>Further Information:</strong> {post.content.furtherInfo}</p>
                  {post.content.guidance && (
                    <p><strong>Guidance and Support:</strong> {post.content.guidance}</p>
                  )}
                </div>
              )}

              <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-article-footer">
          <div className="container">
            <div className="related-posts">
              <div className="related-posts-header">
                <h2>Read more insights</h2>
                <Link to="/blog" className="btn-outline">Back to insights</Link>
              </div>
              <div className="related-posts-grid">
                {Object.values(blogPosts)
                  .filter(p => p.id !== post.id)
                  .slice(0, 3)
                  .map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="related-post-card">
                      <div className="related-post-image">
                        <img src={relatedPost.heroImage} alt={relatedPost.title} />
                      </div>
                      <div className="related-post-content">
                        <h3>{relatedPost.title}</h3>
                        <p>{relatedPost.content.introduction.substring(0, 150)}...</p>
                        <span className="read-more-link">Read more →</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
