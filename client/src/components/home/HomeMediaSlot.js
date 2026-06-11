import React, { useState } from 'react';
import './HomeMediaSlot.css';

/**
 * Renders an image from /public/images/home/ when the file exists.
 * Shows a neutral placeholder (with subtle motion) until you add the asset.
 */
const HomeMediaSlot = ({ src, decorative = true }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="home-media-frame">
      {!failed && (
        <img
          src={src}
          alt=""
          className="home-media-img"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="home-media-placeholder" aria-hidden={decorative}>
          <svg className="home-media-placeholder-svg" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="24" y="32" width="152" height="96" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <path d="M40 88h48M40 104h72M40 120h56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
            <circle cx="148" cy="56" r="16" fill="var(--color-accent-soft)" />
          </svg>
          <span className="home-media-placeholder-hint">Add your image to {src.replace(/^\//, '')}</span>
        </div>
      )}
    </div>
  );
};

export default HomeMediaSlot;
