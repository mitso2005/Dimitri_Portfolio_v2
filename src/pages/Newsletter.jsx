import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import heroImage from '../assets/img/hero_image.svg';
import NewsletterForm from '../components/NewsletterForm.jsx';
import ContentContainer from '../components/ContentContainer.jsx';

export default function Newsletter() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [location.key]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContentContainer>
        <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          newsletter
        </h2>
        <p className="text-left italic text-xs sm:text-sm fade-in-up delay-200">
          Every few months I send out new useful tech resources
        </p>
        
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto">
            <h3 className="text-left fade-in-up delay-300 text-2xl mb-2 -semibold">
              Free Job and Leetcode Tracker!
            </h3>
            <div className="text-left space-y-4 fade-in-up delay-400 mb-10">
              <p>
                Stay organized during your job hunt with this easy-to-use Notion template. 
              </p>
              <p>
                Track applications, schedule interviews, and manage your progress effortlessly.
              </p>
              <p>
                Pair this with a Leetcode tracker to keep your coding skills sharp and land your dream job.
              </p>
            </div>
          </div>
          <div className="fade-in-up delay-500">
            <NewsletterForm />
          </div>
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-5" />
      <Footer />
    </div>
  );
}