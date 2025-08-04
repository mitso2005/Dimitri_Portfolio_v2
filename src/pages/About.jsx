import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ContentContainer from '../components/ContentContainer.jsx';
import AboutImg from '../assets/img/about_image_compress.jpg';

function Countdown() {
  const [gradCountdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Set target date for your Computer Science degree completion
  const targetDate = new Date("2026-11-20T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = targetDate - now;

      // Calculate days, hours, minutes, and seconds
      const daysLeft = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
      const hoursLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutesLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
      const secondsLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60)) / 1000));

      setCountdown({
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex gap-1">
      <span>{gradCountdown.days} days</span>
      <span>{gradCountdown.hours} hours</span>
      <span>{gradCountdown.minutes} minutes</span>
      <span>{gradCountdown.seconds} seconds</span>
    </span>
  );
}

export default function About() {
  const [imageHovered, setImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContentContainer>
        <h2 className="italic text-left text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          about
        </h2>
        <p className="text-left italic text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2 opacity-50">
          get to know a little more about me
        </p>
        
        <div className="text-left space-y-4 fade-in-up delay-300">
          <p>
            Hi my name's Dimitri, I'm a passionate Software Developer and Tech Content Creator based out of Melbourne, Australia. 
          </p>

          <p>
            I'm currently completing a Bachelor of Computing and Software Systems at The University of Melbourne.
          </p>
          
          <p>
            Right now I'm working as a Web Developer @ Yella Terra.
          </p>

          <p>
            I'm also volenteering as a Full Stack Engineer for CISSA's (Computer and Information Systems Student Association) Projects Team.
          </p>

          <p>
            You should hire me in <Countdown /> when I graduate.
          </p>

          {/* Image with caption - different behavior for mobile vs desktop */}
          <div className="mt-16 w-full sm:w-4/5 mx-auto fade-in-up delay-400">
            {!isMobile ? (
              /* Desktop: hover effect with overlay caption */
              <div 
                className="relative cursor-pointer rounded-lg overflow-hidden"
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                <img 
                  src={AboutImg} 
                  alt="Dimitri Petrakis" 
                  className={`rounded-lg shadow-lg w-full transition-all duration-300 ${imageHovered ? 'blur-md scale-105' : ''}`}
                />
                {imageHovered && (
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-white text-lg font-medium px-4 py-2 bg-black/50 rounded-lg">
                      This is me in Ioannina, Greece!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Mobile: image with caption below (no hover, no blur) */
              <figure className="space-y-2">
                <img 
                  src={AboutImg} 
                  alt="Dimitri Petrakis" 
                  className="rounded-lg shadow-lg w-full"
                />
                <figcaption className="text-center text-sm italic">
                  This is me in Ioannina, Greece!
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </ContentContainer>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-5" />
    </div>
  );
}
