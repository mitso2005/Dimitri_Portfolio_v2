import React, { useState, useEffect, useRef } from 'react';
import cissaImage from '../assets/img/projects/cissa.svg';
import githubImage from '../assets/img/projects/github.svg';
import porfoliov1Image from '../assets/img/projects/portfolio_v1.svg';
import portfoliov2Image from '../assets/img/projects/portfolio_v2.svg';
import ytImage from '../assets/img/projects/yt.svg';
import resumeImage from '../assets/img/projects/resume.svg';
import resumePdf from '../assets/pdf/resume.pdf'; // Add this import for the PDF file

// Define preset positions by screen size (small, medium, large)
const presetPositions = {
  small: [
    { x: 50, y: 10 },     // Project 1
    { x: 120, y: 180 },   // Project 2
    { x: 20, y: 350 },    // Project 3
    { x: 150, y: 50 },    // Project 4
    { x: 30, y: 250 },    // Project 5
    { x: 160, y: 450 }    // Project 6
  ],
  medium: [
    { x: 25, y: 25 },     // Project 1
    { x: 425, y: 475 },   // Project 2
    { x: 725, y: 400 },    // Project 3
    { x: 600, y: 75 },    // Project 4
    { x: 50, y: 450 },   // Project 5
    { x: 350, y: 50 }    // Project 6
  ],
  large: [
    { x: 25, y: 25 },     // Project 1
    { x: 500, y: 450 },   // Project 2
    { x: 775, y: 475 },    // Project 3
    { x: 700, y: 75 },    // Project 4
    { x: 50, y: 450 },   // Project 5
    { x: 300, y: 100 }    // Project 6
  ],
};

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "This Website!",
    image: portfoliov2Image,
    techStack: ["React JS", "Tailwind CSS", "Figma"],
    description: "Check out the github repo to see my full design document made with Figma!",
    date: "Jul. 2025",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v2"
  },
  {
    id: 2,
    title: "My Old React Portfolio",
    image: porfoliov1Image,
    techStack: ["React JS", "Tailwind CSS", "Email Js", "Render"],
    description: "A modern, responsive portfolio template built with React, Tailwind, and EmailJS.",
    date: "Mar. 2025",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v1"
  },
  {
    id: 3,
    title: "More Projects!",
    image: githubImage,
    techStack: ["React JS", "React Native", "Python", "Ruby", "JavaScript"],
    description: "Check out my other projects on GitHub. I'm currently learning Ruby on Rails and React Native.",
    date: "",
    link: "https://github.com/mitso2005"
  },
  {
    id: 4,
    title: "Web Developer",
    image: ytImage,
    company: "YellaTerra",
    techStack: ["BigCommerce", "SEO", "HTML/CSS"],
    description: "Managing an e-commerce store with over 10k monthly visitors.",
    date: "Apr. 2024 - Present",
    link: "https://store.yellaterra.com.au/"
  },
  {
    id: 5,
    title: "Full Stack Engineer",
    image: cissaImage,
    company: "Computing and Information Systems Students Association (CISSA)",
    techStack: ["Ruby", "Rails", "Figma"],
    description: "Building new components for The Conversation's online news platform.",
    date: "Mar. 2025 - Present",
    link: "https://cissa.org.au/"
  },
  {
    id: 6,
    title: "Resume",
    image: resumeImage,
    link: resumePdf
  }
];

function ProjectCard({ project, containerRef, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);

  // Detect if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragDistanceRef.current = 0;

    setDragOffset({
      x: e.clientX - containerRect.left - position.x,
      y: e.clientY - containerRect.top - position.y,
    });

    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragDistanceRef.current = Math.sqrt(dx * dx + dy * dy);

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const { width: boxWidth, height: boxHeight } = getBoxSize();

    const newX = Math.min(
      Math.max(0, mouseX - dragOffset.x),
      containerRect.width - boxWidth
    );
    const newY = Math.min(
      Math.max(0, mouseY - dragOffset.y),
      containerRect.height - boxHeight
    );

    setPosition({ x: newX, y: newY });

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    const wasDragging = dragging && dragDistanceRef.current > 5; // Consider it a drag if moved more than 5px
    setDragging(false);
    
    // Only toggle hover state on mobile if wasn't dragging
    if (isMobile && !wasDragging) {
      setIsHovered(!isHovered);
    }
    
    e.stopPropagation();
    e.preventDefault();
  };

  // Link handling function - only the h4 uses this now
  const handleLinkClick = (e) => {
    e.stopPropagation(); // Prevent card click handler from firing
    
    // Special handling for resume card
    if (project.id === 6) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = project.link;
      link.download = 'Dimitri_Petrakis_Resume.pdf'; // Name the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For other cards, open in new tab as before
      window.open(project.link, '_blank');
    }
  };

  // Separate hover state management for card flipping
  const handleCardHover = (hovered) => {
    // Don't allow flipping for the resume card (id 6)
    if (!isMobile && project.id !== 6) {
      setIsHovered(hovered);
    }
  };

  // Responsive box size - increased by 30%
  const getBoxSize = () => {
    // Adjust to include space for the link text below the image
    if (project.id === 6) {
      return { width: Math.round(182 * 1.1), height: Math.round(254 * 1.1) + 40 }; // +40px for link area
    }
    return { width: Math.round(325 * 1.1), height: Math.round(176 * 1.1) + 40 }; // +40px for link area
  };

  // Listen for resize to force re-render for box size
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handleResize = () => forceUpdate(x => x + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [dragging, dragOffset]);

  // Add effect to adjust position when container size changes
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const { width: boxWidth, height: boxHeight } = getBoxSize();
      
      // Make sure position stays within bounds
      setPosition(prev => ({
        x: Math.min(Math.max(0, prev.x), containerRect.width - boxWidth),
        y: Math.min(Math.max(0, prev.y), containerRect.height - boxHeight)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);

  const { width: cardWidth, height: cardHeight } = getBoxSize();
  const imageHeight = project.id === 6 ? Math.round(254 * 1.1) : Math.round(176 * 1.1); // Original image height increased by 10%

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        left: position.x,
        top: position.y,
        width: cardWidth,
        height: cardHeight,
        transform: dragging ? 'scale(1.05)' : 'scale(1)',
        transition: dragging ? 'none' : 'transform 0.2s ease',
        zIndex: dragging ? 50 : 1, // Increase z-index when dragging to bring to front
      }}
      className={`
        absolute rounded-xl shadow-lg select-none
        ${dragging
          ? 'cursor-grabbing shadow-2xl'
          : 'cursor-grab hover:shadow-xl'
        }
        transition-all duration-200 overflow-hidden
        flex flex-col
      `}
    >
      {/* Upper part (image/info) that flips on hover */}
      <div 
        className="relative flex-1 overflow-hidden rounded-t-[15px]"
        style={{ height: imageHeight }}
      >
        {/* For resume card or when not hovered */}
        {(!isHovered || project.id === 6) ? (
          // Image view (default state)
          <div className="w-full h-full relative">
            {project.id !== 6 && (
              <div 
                className="absolute w-full h-full z-0"
                onMouseEnter={() => handleCardHover(true)}
                onMouseLeave={() => handleCardHover(false)}
              ></div>
            )}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-t-[15px] pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          // Info view (on hover) - only for non-resume cards
          <div 
            className="w-full h-full text-[var(--color-light)] p-2 flex flex-col justify-between rounded-t-[15px] bg-[var(--color-dark)]"
            onMouseLeave={() => handleCardHover(false)}
          >
            <div>
              <h4 className="pointer-events-none ">
                {project.title}
              </h4>
              {/* Optional company field */}
              {project.company && (
                <p className="text-xs text-[var(--color-light)] opacity-75 mb-1 pointer-events-none">
                  {project.company}
                </p>
              )}
              <div className="text-xs mb-1 pointer-events-none">
                <div className="flex flex-wrap gap-1">
                  {project.techStack && project.techStack.slice(0, 3).map((tech, index) => (
                    <span key={index} className="bg-white/20 px-1 py-0.5 rounded-[15px] text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.techStack && project.techStack.length > 2 && (
                    <span className="bg-white/20 px-1 py-0.5 rounded-[15px] text-xs">
                      +{project.techStack.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              {project.description && (
                <p className="text-left text-xs mb-1 line-clamp-3 pointer-events-none">
                  {project.description}
                </p>
              )}
              {project.date && (
                <p className="text-xs opacity-75 pointer-events-none">
                  {project.date}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Lower part (link) that's always visible */}
      <div
        className={`${
          project.id === 6
            ? "bg-[var(--color-dark)]"
            : project.id === 4 || project.id === 5
              ? "bg-[var(--color-primary-pink)]"
              : "bg-[var(--color-primary-blue)]"
        } bg-opacity-90 px-4 py-2 rounded-b-[15px] cursor-pointer hover:bg-opacity-100`}
        onClick={handleLinkClick}
      >
        <h4
          className={`${
            project.id === 6
              ? "text-[var(--color-light)]" 
              : "text-[var(--color-dark)]"
          } text-left m-0 cursor-pointer hover:text-[var(--color-secondary-blue)] transition-colors`}
          style={{ fontSize: '14px' }}
        >
          {project.id === 6
            ? "DOWNLOAD RESUME"
            : project.id === 4 || project.id === 5
              ? "LINK TO WEBSITE \u2192"
              : "LINK TO GITHUB \u2192"}
        </h4>
      </div>
    </div>
  );
}

export default function DraggableProjectCards() {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const [screenSize, setScreenSize] = useState('medium');
  const [showPopup, setShowPopup] = useState(true); // Start with popup visible

  // Helper to get card size for each project
  const getBoxSize = (project) => {
    if (project.id === 6) {
      return { width: Math.round(182 * 1.1), height: Math.round(254 * 1.1) };
    }
    return { width: Math.round(325 * 1.1), height: Math.round(176 * 1.1) };
  };

  // Determine screen size category
  useEffect(() => {
    const determineScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('small');
      } else if (width < 1024) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    determineScreenSize();
    window.addEventListener('resize', determineScreenSize);
    return () => window.removeEventListener('resize', determineScreenSize);
  }, []);

  // Initialize and adjust positions based on container size
  useEffect(() => {
    if (!containerRef.current || !screenSize) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Adjust preset positions to fit container
    const adjustedPositions = projectsData.map((project, index) => {
      const { width, height } = getBoxSize(project);
      const preset = presetPositions[screenSize][index];
      
      // Scale the position to the current container size
      const scaleX = containerWidth / 1000; // Assuming presets are based on 1000px width
      const scaleY = containerHeight / 800; // Assuming presets are based on 800px height
      
      // Ensure positions are within bounds
      const x = Math.min(Math.max(0, preset.x * scaleX), containerWidth - width);
      const y = Math.min(Math.max(0, preset.y * scaleY), containerHeight - height);
      
      return { x, y };
    });

    setPositions(adjustedPositions);
  }, [containerRef.current, screenSize]);

  // Update positions when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !positions) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Adjust current positions to ensure they're still in bounds
      const adjustedPositions = projectsData.map((project, idx) => {
        const { width, height } = getBoxSize(project);
        const currentPos = positions[idx];
        
        if (!currentPos) return presetPositions[screenSize][idx]; // Fallback to preset
        
        // Ensure positions remain in bounds
        return {
          x: Math.min(Math.max(0, currentPos.x), containerWidth - width),
          y: Math.min(Math.max(0, currentPos.y), containerHeight - height)
        };
      });

      setPositions(adjustedPositions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [positions, containerRef.current, screenSize]);

  return (
    <div className="w-full">
      <div className="flex flex-col h-full">
        {/* Cards container */}
        <div
          ref={containerRef}
          className="shadow-md border-2 bg-[var(--color-light)] border-[var(--color-dark)] relative rounded-[15px]"
          style={{ 
            height: 'calc(65vh)',
          }}
        >
          {positions &&
            projectsData.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                containerRef={containerRef}
                initialPosition={positions[idx]}
              />
            ))}
            
          {/* Instructions popup */}
          {showPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div 
                className="p-4 shadow-md border-2 border-[var(--color-dark)] rounded-[15px] max-w-xs text-center"
                style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="w-5"></div> {/* Spacer to balance the close button */}
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="text-[var(--color-dark)] hover:text-[var(--color-secondary_blue)] transition-colors"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="bold">
                  Hover, Drag and Click to
                </p>
                <p className="bold mb-2">
                  learn more!
                </p>
                
                {/* Color key inside popup, optimized for smaller space */}
                <div className="flex flex-col items-start gap-1 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--color-primary-blue)] mr-2 rounded"></div>
                    <p>Personal Projects</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--color-primary-pink)] mr-2 rounded"></div>
                    <p>Work Experience</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[var(--color-dark)] mr-2 rounded"></div>
                    <p>Resume</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}