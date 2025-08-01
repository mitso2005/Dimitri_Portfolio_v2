import React from 'react';
import Header from '../components/Header.jsx';
import DraggableProjectCards from '../components/ProjectCard.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import heroImage from '../assets/img/hero_image.svg';

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Apply ContentContainer to title and description only */}
      <ContentContainer>
        <h2 className="text-left text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          My Work
        </h2>
        <p className="text-left text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2">
          Discover my coding projects and work experience. Just Hover, Drag and Click to learn more!
        </p>
        
        {/* Wrapper div with fade-in instead of fade-in-up to avoid position issues */}
        <div className="fade-in delay-300 relative">
          <DraggableProjectCards />
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}