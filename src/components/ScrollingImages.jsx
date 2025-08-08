import React, { useState, useEffect } from 'react';

// Import all scroll images
import image1 from '../assets/img/scroll/image 1.svg';
import image2 from '../assets/img/scroll/image 2.svg';
import image3 from '../assets/img/scroll/image 3.svg';
import image4 from '../assets/img/scroll/image 4.svg';
import image5 from '../assets/img/scroll/image 5.svg';
import image6 from '../assets/img/scroll/image 6.svg';
import image7 from '../assets/img/scroll/image 7.svg';
import image8 from '../assets/img/scroll/image 8.svg';
import image9 from '../assets/img/scroll/image 9.svg';
import image10 from '../assets/img/scroll/image 10.svg';

const ScrollingImages = ({ position = 'right', direction = 'down', opacity = 1, speed = 120 }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const images = [
    image1, image2, image3, image4, image5,
    image6, image7, image8, image9, image10
  ];

  // Check for desktop vs mobile screen size
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 820); // Desktop breakpoint
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Adjust position classes based on the position prop
  let positionClass;
  if (position === 'right') {
    positionClass = 'right-10';
  } else if (position === 'left') {
    positionClass = 'left-10';
  } else if (position === 'center') {
    positionClass = 'left-1/2 -translate-x-1/2'; // Center position
  }
  
  const animationClass = direction === 'down' ? 'animate-scroll-vertical' : 'animate-scroll-vertical-reverse';
  
  // Responsive size based on desktop vs mobile
  const imageWidth = isDesktop ? '354px' : '177px';  // Double width on desktop
  const imageHeight = isDesktop ? '550px' : '275px';  // Double height on desktop
  const containerWidth = isDesktop ? 'w-auto' : 'w-auto'; // Changed from fixed widths to auto

  return (
    <div 
      className={`fixed ${positionClass} top-0 ${containerWidth} h-screen overflow-hidden pointer-events-none`} 
      style={{ 
        zIndex: 0, 
        opacity: opacity,
        // Add mask image gradient for top and bottom fade effects
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 90%, transparent 100%)'
      }}
    >
      <div 
        className={animationClass}
        style={{
          animationDuration: `${speed}s`
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <img
            key={`first-${index}`}
            src={image}
            alt={`Scroll image ${index + 1}`}
            className="block mb-2.5" // Removed w-full class
            style={{ 
              height: imageHeight, 
              width: imageWidth,
              maxWidth: '100%' // Ensure images don't exceed container width
            }}
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <img
            key={`second-${index}`}
            src={image}
            alt={`Scroll image ${index + 1}`}
            className="block mb-2.5" // Removed w-full class
            style={{ 
              height: imageHeight, 
              width: imageWidth,
              maxWidth: '100%' // Ensure images don't exceed container width
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollingImages;
