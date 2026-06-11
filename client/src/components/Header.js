import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesNavGroups } from '../data/servicePages';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setDesktopDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const servicesPathActive = location.pathname.startsWith('/services');

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img src="/logo.png" alt="Greyline Accountants Ltd." className="logo-image" />
          </Link>

          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMobileMenu}>
              Home
            </Link>

            <div
              ref={dropdownRef}
              className={`nav-dropdown ${desktopDropdownOpen ? 'nav-dropdown--open' : ''}`}
            >
              <button
                type="button"
                className={`nav-dropdown-trigger ${servicesPathActive ? 'active' : ''}`}
                aria-expanded={desktopDropdownOpen}
                aria-haspopup="true"
                onClick={() => setDesktopDropdownOpen((o) => !o)}
              >
                Services
              </button>
              <div className="nav-dropdown-panel" role="menu">
                {servicesNavGroups.map((group) => (
                  <div key={group.label} className="nav-dropdown-col">
                    <span className="nav-dropdown-heading">{group.label}</span>
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="nav-dropdown-link"
                        role="menuitem"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link to="/services" className="nav-dropdown-all" onClick={closeMobileMenu}>
                  All services
                </Link>
              </div>
            </div>

            <div className="nav-mobile-services">
              <button
                type="button"
                className="nav-mobile-services-trigger"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((o) => !o)}
              >
                Services
                <span className="nav-chevron" aria-hidden>
                  {mobileServicesOpen ? '\u2212' : '+'}
                </span>
              </button>
              {mobileServicesOpen && (
                <div className="nav-mobile-services-panel">
                  {servicesNavGroups.map((group) => (
                    <div key={group.label} className="nav-mobile-group">
                      <span className="nav-mobile-group-title">{group.label}</span>
                      {group.items.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link to="/services" onClick={closeMobileMenu}>
                    All services
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={isActive('/about') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={isActive('/contact') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link to="/contact" className="btn-primary nav-cta" onClick={closeMobileMenu}>
              Submit Your Query
            </Link>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
