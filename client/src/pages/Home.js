import React from 'react';
import Hero from '../components/home/Hero';
import HomeProblem from '../components/home/HomeProblem';
import HomeSolution from '../components/home/HomeSolution';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import HomeFinalCta from '../components/home/HomeFinalCta';
import './Home.css';
import './HomePageMotion.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <HomeProblem />
      <HomeSolution />
      <ServicesOverview />
      <WhyChooseUs />
      <HowItWorks />
      <HomeFinalCta />
    </div>
  );
};

export default Home;
