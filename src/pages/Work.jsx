import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import DraggableProjectCards from '../components/ProjectCard.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import Footer from '../components/Footer.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ScrollableProjectList from '../components/ScrollableProjectList.jsx'; 

export default function Work() {
  const [viewMode, setViewMode] = useState('draggable'); // 'draggable' or 'scrollable'
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  
  // Check for small screen size
  useEffect(() => {
    const checkIsSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    
    checkIsSmallScreen();
    window.addEventListener('resize', checkIsSmallScreen);
    return () => window.removeEventListener('resize', checkIsSmallScreen);
  }, []);

  // Force list view on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setViewMode('scrollable');
    }
  }, [isSmallScreen]);
  
  const toggleViewMode = () => {
    // Only allow toggling on larger screens
    if (!isSmallScreen) {
      setViewMode(prev => prev === 'draggable' ? 'scrollable' : 'draggable');
    }
  };

  // Scroll to top on mount
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
      
      <ContentContainer allowFullWidth={viewMode === 'draggable' && !isSmallScreen}>
        <div className={viewMode === 'draggable' && !isSmallScreen ? 'max-w-3xl mx-auto' : ''}>
          <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
            work
          </h2>
          
          {/* Put paragraph and button in line */}
          <div className="flex justify-between items-center fade-in-up delay-200">
            <p className="text-left italic text-xs sm:text-sm">
              {viewMode === 'draggable' ? 
                "Discover my coding projects and work experience." :
                "Discover my coding projects and work experience chronologically."
              }
            </p>
            
            {/* Only show toggle button on larger screens */}
            {!isSmallScreen && (
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
            )}
          </div>
        </div>
        
        {/* Content based on view mode */}
        <div className="fade-in delay-500 relative w-full">
          {viewMode === 'draggable' && !isSmallScreen ? (
            <div className="w-full" style={{ marginTop: '40px', marginBottom: '40px' }}>
              <DraggableProjectCards />
            </div>
          ) : (
            <div className={viewMode === 'draggable' && !isSmallScreen ? '' : 'max-w-3xl mx-auto'}>
              <ScrollableProjectList />
            </div>
          )}
        </div>
      </ContentContainer>
      
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-5" />
      <Footer />
    </div>
  );
}