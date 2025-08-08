import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_image.svg';
import HomeNav from '../components/HomeNav.jsx';
import Logo from '../components/Logo.jsx';

export default function Home() {
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
