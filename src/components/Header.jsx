import React, { useState, useEffect } from 'react';
import PageNav from './PageNav';
import Logo from './Logo';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <header className="w-full flex justify-between items-center p-4 md:p-6">
      {/* Fixed gradient background bar at top of screen */}
      <div 
        className="fixed md:absolute top-0 left-0 right-0 z-30"
        style={{ 
          height: '100px',
          background: 'linear-gradient(to bottom, var(--color-light) 50%, transparent 100%)'
        }}
      />
      <div className="flex-1">
        <PageNav />
        <Logo />
      </div>
    </header>
  );
};

export default Header;
