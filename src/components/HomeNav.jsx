import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: "/about", defaultText: "HI", hoverText: "about", delay: "delay-300" },
  { to: "/work", defaultText: "MY", hoverText: "work", delay: "delay-400" },
  { to: "/newsletter", defaultText: "NAME'S", hoverText: "newsletter", delay: "delay-500" },
  { to: "/contact", defaultText: "DIMITRI", hoverText: "contact me", delay: "delay-600" },
];

function HoverLink({ to, defaultText, hoverText, className, isAutoHovered, onMouseEnter, onMouseLeave, isMobile, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  const showHover = isHovered || isAutoHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <Link
      to={to}
      className={`${className} fade-in-up ${delay}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showHover ? (
        <span className={`hover-text ${isMobile ? 'mobile-hover' : ''}`}>
          {hoverText}
        </span>
      ) : (
        defaultText
      )}
    </Link>
  );
}

export default function HomeNav() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [permanentlyRevealed, setPermanentlyRevealed] = useState(new Set());
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop cycling logic
  useEffect(() => {
    if (isMobile) return;

    const startCycling = () => {
      timeoutRef.current = setTimeout(() => {
        setActiveIndex(0);

        intervalRef.current = setInterval(() => {
          setActiveIndex(prev => (prev + 1) % links.length);
        }, 2000);
      }, 2000);
    };

    const stopCycling = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isNavHovered) {
      startCycling();
    } else {
      stopCycling();
      setActiveIndex(null);
    }

    return () => {
      stopCycling();
    };
  }, [isNavHovered, isMobile]);

  // Mobile animation logic
  useEffect(() => {
    if (!isMobile) {
      // Reset when switching back to desktop
      setPermanentlyRevealed(new Set());
      return;
    }

    // Reset permanent reveals when switching to mobile
    setPermanentlyRevealed(new Set());

    // After 2 seconds, reveal "about"
    timeoutRef.current = setTimeout(() => {
      setPermanentlyRevealed(new Set([0]));
      
      // Then reveal the rest one by one with 1 second intervals
      links.slice(1).forEach((_, index) => {
        const actualIndex = index + 1;
        setTimeout(() => {
          setPermanentlyRevealed(prev => new Set([...prev, actualIndex]));
        }, (actualIndex) * 500); // 0.5s, 1s, 1.5s delays
      });
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMobile]);

  const handleNavMouseEnter = () => {
    setIsNavHovered(true);
  };

  const handleNavMouseLeave = () => {
    setIsNavHovered(false);
  };

  return (
    <nav 
      className="absolute bottom-10 left-10 flex flex-col items-start"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
    >
      {links.map((link, idx) => (
        <HoverLink
          key={idx}
          to={link.to}
          defaultText={link.defaultText}
          hoverText={link.hoverText}
          className="home-link"
          isAutoHovered={
            isMobile 
              ? permanentlyRevealed.has(idx)
              : !isMobile && activeIndex === idx
          }
          isMobile={isMobile}
          delay={link.delay}
        />
      ))}
    </nav>
  );
}