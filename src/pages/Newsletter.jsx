import React from 'react';
import Header from '../components/Header.jsx';
import heroImage from '../assets/img/hero_image.svg';
import NewsletterForm from '../components/NewsletterForm.jsx';
import notionImage from '../assets/img/notion_preview.jpg';
import ContentContainer from '../components/ContentContainer.jsx';

export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContentContainer>
        <h2 className="text-left text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          Newsletter
        </h2>
        <p className="text-left text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2">
          Get your free job and leetcode tracker!
        </p>
        
        <div className="fade-in-up delay-300 space-y-6">
          <p className="text-left">
            Filler text about my job tracker and leetcode tracker.
          </p>
          
          <NewsletterForm />
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}