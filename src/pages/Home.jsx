import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_image.svg';

function HoverLink({ to, defaultText, hoverText, className }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={to}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? <span className="hover-text">{hoverText}</span> : defaultText}
    </Link>
  );
}

export default function Home() {
  return (
    <div>
        <img src={heroImage} alt="Illustration of Dimitri" className="hero-image" />
        <nav className="home-nav">
        <HoverLink to="/about" defaultText="HI" hoverText="about" className="home-link" />
        <HoverLink to="/work" defaultText="MY" hoverText="work" className="home-link" />
        <HoverLink to="/mail" defaultText="NAME'S" hoverText="mail" className="home-link" />
        <HoverLink to="/contact" defaultText="DIMITRI" hoverText="contact" className="home-link" />
        </nav>
    </div>
  );
}
