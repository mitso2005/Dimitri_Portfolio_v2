import React from 'react';
import Header from '../components/Header.jsx';
import heroImage from '../assets/img/hero_image.svg';
import NewsletterForm from '../components/NewsletterForm.jsx';
import ContentContainer from '../components/ContentContainer.jsx';

export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContentContainer>
        <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          newsletter
        </h2>
        <p className="text-left italic text-xs sm:text-sm fade-in-up delay-200 -mt-2 opacity-50 mb-8">
          Every few months I send out new useful tech resources
        </p>
        
        <div className="fade-in-up delay-300 space-y-6 flex flex-col items-center mb-4 pb-4">
          <div className="w-full max-w-4xl mx-auto">
            <h3 className="text-left text-2xl mb-4 -semibold">
              Free Job and Leetcode Tracker!
            </h3>
            <p className="text-left mb-4">
              Stay organized during your job hunt with this easy-to-use Notion template. 
              Track applications, schedule interviews, and manage your progress effortlessly. 
              Pair this with a Leetcode tracker to keep your coding skills sharp and land your dream job.
            </p>
          </div>
          
          <NewsletterForm />
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-5" />
    </div>
  );
}