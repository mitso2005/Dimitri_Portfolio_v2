import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import DraggableProjectCards from '../components/ProjectCard.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ScrollableProjectList from '../components/ScrollableProjectList.jsx'; // New component

export default function Work() {
  const [viewMode, setViewMode] = useState('draggable'); // 'draggable' or 'scrollable'
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'draggable' ? 'scrollable' : 'draggable');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <ContentContainer>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
              work
            </h2>
            <p className="text-left italic text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2 opacity-50">
              {viewMode === 'draggable' ? 
                "Discover my coding projects and work experience. Just Hover, Drag and Click to learn more!" :
                "Discover my coding projects and work experience chronologically."
              }
            </p>
          </div>
          
          {/* Toggle button */}
          <button 
            onClick={toggleViewMode}
            className="bg-[var(--color-primary-blue)] text-[var(--color-dark)] rounded-[15px] px-4 py-2 
                      border-2 border-[var(--color-dark)] transition-all hover:bg-[var(--color-dark)] 
                      hover:text-[var(--color-primary-blue)] fade-in delay-300 flex items-center"
          >
            <span className="mr-2 font-medium">
              {viewMode === 'draggable' ? 'List View' : 'Card View'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {viewMode === 'draggable' ? (
                // List icon
                <>
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </>
              ) : (
                // Grid icon
                <>
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </>
              )}
            </svg>
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