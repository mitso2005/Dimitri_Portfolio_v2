import React from 'react';

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

const ScrollingImages = ({ position = 'right', direction = 'down' }) => {
  const images = [
    image1, image2, image3, image4, image5,
    image6, image7, image8, image9, image10
  ];

  const positionClass = position === 'right' ? 'right-7' : 'left-10';
  const animationClass = direction === 'down' ? 'animate-scroll-vertical' : 'animate-scroll-vertical-reverse';

  return (
    <div className={`fixed ${positionClass} top-0 w-48 h-screen overflow-hidden pointer-events-none`} style={{ zIndex: 0 }}>
      <div className={animationClass}>
        {/* First set of images */}
        {images.map((image, index) => (
          <img
            key={`first-${index}`}
            src={image}
            alt={`Scroll image ${index + 1}`}
            className="w-full h-auto block mb-2.5"
            style={{ height: '275px', width: '177px' }}
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <img
            key={`second-${index}`}
            src={image}
            alt={`Scroll image ${index + 1}`}
            className="w-full h-auto block mb-2.5"
            style={{ height: '275px', width: '177px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollingImages;
