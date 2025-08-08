import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_image.svg';
import HomeNav from '../components/HomeNav.jsx';
import Logo from '../components/Logo.jsx';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Disable all scrolling on home page
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <div>
      <HomeNav />
      <div className="fade-in delay-100">
        <Logo />
      </div>
      <div className="hero-image-container fade-in delay-100">
        <img 
          src={heroImage} 
          alt="Illustration of Dimitri" 
          className="hero-image" 
        />
      </div>
    </div>
  );
}
