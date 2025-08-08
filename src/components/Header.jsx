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
      <div className="flex-1">
        <PageNav />
        <Logo />
      </div>
    </header>
  );
};

export default Header;
