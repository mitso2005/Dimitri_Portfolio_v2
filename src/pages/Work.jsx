import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import DraggableProjectCards from '../components/ProjectCard.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ScrollableProjectList from '../components/ScrollableProjectList.jsx'; 

export default function Work() {
  const [viewMode, setViewMode] = useState('draggable'); // 'draggable' or 'scrollable'
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'draggable' ? 'scrollable' : 'draggable');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <ContentContainer>
        <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          work
        </h2>
        
        {/* Put paragraph and button in line */}
        <div className="flex justify-between items-center fade-in-up delay-200 -mt-2">
          <p className="text-left italic text-zinc-500 text-xs sm:text-sm opacity-50">
            {viewMode === 'draggable' ? 
              "Discover my coding projects and work experience." :
              "Discover my coding projects and work experience chronologically."
            }
          </p>
          
          <button 
            onClick={toggleViewMode}
            className={`btn-custom fade-in delay-300 ${
              viewMode === 'draggable' 
                ? 'bg-[var(--color-primary-pink)]' 
                : 'bg-[var(--color-primary-blue)]'
            }`}
          >
            <p className="italic">
              {viewMode === 'draggable' ? 'List View' : 'Card View'}
            </p>
          </button>
        </div>
        
        {/* Content based on view mode */}
        <div className="fade-in delay-300 relative">
          {viewMode === 'draggable' ? (
            <DraggableProjectCards />
          ) : (
            <ScrollableProjectList />
          )}
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-5" />
    </div>
  );
}