import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function HomeNav() {
  return (
    <nav className="absolute bottom-10 left-10 flex flex-col items-start">
      <HoverLink to="/about" defaultText="HI" hoverText="about" className="home-link" />
      <HoverLink to="/work" defaultText="MY" hoverText="work" className="home-link" />
      <HoverLink to="/mail" defaultText="NAME'S" hoverText="mail" className="home-link" />
      <HoverLink to="/contact" defaultText="DIMITRI" hoverText="contact" className="home-link" />
    </nav>
  );
}
