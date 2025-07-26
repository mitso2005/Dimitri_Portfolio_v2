import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: "/about", defaultText: "HI", hoverText: "about" },
  { to: "/work", defaultText: "MY", hoverText: "work" },
  { to: "/mail", defaultText: "NAME'S", hoverText: "mail" },
  { to: "/contact", defaultText: "DIMITRI", hoverText: "contact" },
];

function HoverLink({ to, defaultText, hoverText, className, isAutoHovered }) {
  const [isHovered, setIsHovered] = useState(false);
  const showHover = isHovered || isAutoHovered;

  return (
    <Link
      to={to}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showHover ? <span className="hover-text">{hoverText}</span> : defaultText}
    </Link>
  );
}

export default function HomeNav() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Wait 2 seconds, then start cycling every 4s
    const timeout = setTimeout(() => {
      setActiveIndex(0); // start from first word

      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % links.length);
      }, 2000);

      // Clear interval when component unmounts
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <nav className="absolute bottom-10 left-10 flex flex-col items-start">
      {links.map((link, idx) => (
        <HoverLink
          key={idx}
          to={link.to}
          defaultText={link.defaultText}
          hoverText={link.hoverText}
          className="home-link"
          isAutoHovered={activeIndex === idx}
        />
      ))}
    </nav>
  );
}
