import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useInView,
  HOME_SECTION_IN_VIEW_ROOT_MARGIN,
  HOME_SECTION_IN_VIEW_THRESHOLD,
  USE_IN_VIEW_REPEAT,
} from '../../hooks/useInView';
import { getAllServices } from '../../data/servicePages';
import './ServicesOverview.css';

const ServicesOverview = () => {
  const [ref, visible] = useInView(
    HOME_SECTION_IN_VIEW_THRESHOLD,
    HOME_SECTION_IN_VIEW_ROOT_MARGIN,
    USE_IN_VIEW_REPEAT
  );
  const services = getAllServices();
  const carouselRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollAffordance = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const edge = 6;
    setCanScrollPrev(scrollLeft > edge);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - edge);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return undefined;
    updateScrollAffordance();
    el.addEventListener('scroll', updateScrollAffordance, { passive: true });
    const ro = new ResizeObserver(updateScrollAffordance);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollAffordance);
      ro.disconnect();
    };
  }, [services.length, updateScrollAffordance]);

  const scrollCarousel = useCallback((direction) => {
    const root = carouselRef.current;
    if (!root) return;
    const first = root.querySelector('.service-link-card');
    const gap = 22;
    const step = first ? first.offsetWidth + gap : Math.round(root.clientWidth * 0.85);
    root.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <section className="services-overview services-overview--compact">
      <div className="container">
        <div
          ref={ref}
          className={`services-overview-inner reveal-group ${visible ? 'is-visible' : ''}`}
        >
          <h2 className="section-title reveal-item">Services overview</h2>
          <p className="services-overview-intro reveal-item">
            Explore each service in detail on its own page, or send us your query and we will recommend
            the right support.
          </p>
          <div className="services-carousel-bleed">
            <div className="services-carousel-shell">
              <button
                type="button"
                className="services-carousel-nav services-carousel-nav--prev"
                onClick={() => scrollCarousel(-1)}
                disabled={!canScrollPrev}
                aria-label="Previous services"
                aria-controls="services-carousel"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  />
                </svg>
              </button>
              <div
                ref={carouselRef}
                id="services-carousel"
                className="services-carousel"
                role="region"
                aria-label="Our services"
              >
                <div className="services-link-grid">
                  {services.map((s, index) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className={`service-link-card reveal-item services-link-card-${index}`}
                    >
                      <span className="service-link-card-media" aria-hidden="true" />
                      <div className="service-link-card-content">
                        <span className="service-link-icon" aria-hidden>
                          {s.icon}
                        </span>
                        <h3>{s.title}</h3>
                        <p>{s.heroDescription}</p>
                        <span className="service-link-more">View service</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="services-carousel-nav services-carousel-nav--next"
                onClick={() => scrollCarousel(1)}
                disabled={!canScrollNext}
                aria-label="Next services"
                aria-controls="services-carousel"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                  />
                </svg>
              </button>
            </div>
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

export default ServicesOverview;
