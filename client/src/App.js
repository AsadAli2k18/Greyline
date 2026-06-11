import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AgencyProfitScore from './pages/AgencyProfitScore';
import AgencyProfitScoreGetStarted from './pages/AgencyProfitScoreGetStarted';
import AgencyProfitScoreAssessment from './pages/AgencyProfitScoreAssessment';
import AgencyProfitScoreResults from './pages/AgencyProfitScoreResults';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function Layout({ children }) {
  const location = useLocation();
  const isAgencyProfitScorePage = location.pathname.startsWith('/agency-profit-score');
  
  return (
    <>
      {!isAgencyProfitScorePage && <Header />}
      {children}
      {!isAgencyProfitScorePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/agency-profit-score" element={<AgencyProfitScore />} />
            <Route path="/agency-profit-score/get-started" element={<AgencyProfitScoreGetStarted />} />
            <Route path="/agency-profit-score/assessment" element={<AgencyProfitScoreAssessment />} />
            <Route path="/agency-profit-score/results" element={<AgencyProfitScoreResults />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
