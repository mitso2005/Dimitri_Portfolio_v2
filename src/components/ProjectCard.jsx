import React, { useState, useEffect, useRef } from 'react';
import cissaImage from '../assets/img/projects/cissa.svg';
import githubImage from '../assets/img/projects/github.svg';
import porfoliov1Image from '../assets/img/projects/portfolio_v1.svg';
import portfoliov2Image from '../assets/img/projects/portfolio_v2.svg';
import ytImage from '../assets/img/projects/yt.svg';
import resumeImage from '../assets/img/projects/resume.svg';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "This Website!",
    image: portfoliov2Image,
    techStack: ["React JS", "Tailwind CSS", "Figma"],
    description: "A responsive portfolio website built with React and Tailwind.",
    date: "Jul. 2025",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v2"
  },
  {
    id: 2,
    title: "My Old Portfolio",
    image: porfoliov1Image,
    techStack: ["React JS", "Tailwind CSS", "Render"],
    description: "RESTful API backend service with authentication and database integration.",
    date: "Mar. 2025",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v1"
  },
  {
    id: 3,
    title: "Discover my other projects",
    image: githubImage,
    techStack: ["React JS", "React Native", "Python", "+More"],
    description: "Data visualization and analysis tool for processing large datasets.",
    date: "",
    link: "https://github.com/mitso2005"
  },
  {
    id: 4,
    title: "Web Developer @ YellaTerra",
    image: ytImage,
    techStack: ["BigCommerce", "SEO", "HTML/CSS"],
    description: "A real-time chat application using websockets and Node.js.",
    date: "Apr. 2024 - Present",
    link: "https://store.yellaterra.com.au/"
  },
  {
    id: 5,
    title: "Front-End Engineer @ Cissa",
    image: cissaImage,
    techStack: ["React Native", "TypeScript", "Figma"],
    description: "An e-commerce platform built with React Native and Firebase backend.",
    date: "Mar. 2025 - Present",
    link: "https://cissa.org.au/"
  },
  {
    id: 6,
    title: "C# Game Engine",
    image: resumeImage,
    techStack: ["C#", ".NET", "MonoGame"],
    description: "A simple 2D game engine built in C# using MonoGame.",
    date: "2023-09",
    link: "https://github.com/yourusername/csharp-game-engine"
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
    window.open(project.link, '_blank');
  };

  // Separate hover state management for card flipping
  const handleCardHover = (hovered) => {
    if (!isMobile) {
      setIsHovered(hovered);
    }
  };

  // Responsive box size
  const getBoxSize = () => {
    // Adjust to include space for the link text below the image
    if (project.id === 6) {
      return { width: 182, height: 254 + 40 }; // +40px for link area
    }
    return { width: 325, height: 176 + 40 }; // +40px for link area
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

  const { width: cardWidth, height: cardHeight } = getBoxSize();
  const imageHeight = project.id === 6 ? 254 : 176; // Original image height

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
        className="relative flex-1 overflow-hidden rounded-t-xl"
        style={{ height: imageHeight }}
      >
        {!isHovered ? (
          // Image view (default state)
          <div className="w-full h-full relative">
            <div 
              className="absolute w-full h-full z-0"
              onMouseEnter={() => handleCardHover(true)}
              onMouseLeave={() => handleCardHover(false)}
            ></div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-t-xl pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          // Info view (on hover)
          <div 
            className="w-full h-full text-white p-2 flex flex-col justify-between rounded-t-xl bg-[var(--color-dark)]"
            onMouseLeave={() => handleCardHover(false)}
          >
            <div>
              <h3 className="text-xs font-bold mb-1 truncate pointer-events-none">
                {project.title}
              </h3>
              <div className="text-xs mb-1 pointer-events-none">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 2).map((tech, index) => (
                    <span key={index} className="bg-white/20 px-1 py-0.5 rounded-xl text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 2 && (
                    <span className="bg-white/20 px-1 py-0.5 rounded-xl text-xs">
                      +{project.techStack.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs mb-1 line-clamp-2 pointer-events-none">
                {project.description}
              </p>
              <p className="text-xs opacity-75 pointer-events-none">
                {project.date}
              </p>
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
        } bg-opacity-90 px-4 py-2 rounded-b-xl cursor-pointer hover:bg-opacity-100`}
        onClick={handleLinkClick}
      >
        <h4
          className="text-[var(--color-light)] text-left m-0 cursor-pointer hover:text-[var(--color-secondary-blue)] transition-colors"
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

  // Helper to get card size for each project
  const getBoxSize = (project) => {
    if (project.id === 6) {
      return { width: 182, height: 254 };
    }
    return { width: 325, height: 176 };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Generate random positions for each project
    const newPositions = projectsData.map((project) => {
      const { width, height } = getBoxSize(project);
      const maxX = Math.max(0, containerWidth - width);
      const maxY = Math.max(0, containerHeight - height);
      return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
      };
    });
    setPositions(newPositions);
    // eslint-disable-next-line
  }, [containerRef.current]);

  // Re-randomize on window resize
  useEffect(() => {
    const handleResize = () => {
      setPositions(null); // trigger re-randomization
      setTimeout(() => {
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const containerWidth = containerRect.width;
          const containerHeight = containerRect.height;
          const newPositions = projectsData.map((project) => {
            const { width, height } = getBoxSize(project);
            const maxX = Math.max(0, containerWidth - width);
            const maxY = Math.max(0, containerHeight - height);
            return {
              x: Math.floor(Math.random() * maxX),
              y: Math.floor(Math.random() * maxY)
            };
          });
          setPositions(newPositions);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed left-10 right-10 bottom-10 top-60 md:top-80">
      <div className="flex flex-col h-full">
        {/* Legend/Key for card colors */}
        <div className="flex justify-end mb-2 gap-4 pr-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[var(--color-primary-blue)] mr-2 rounded"></div>
            <span className="text-xs text-[var(--color-dark)]">Personal Projects</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[var(--color-primary-pink)] mr-2 rounded"></div>
            <span className="text-xs text-[var(--color-dark)]">Work Experience</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[var(--color-dark)] mr-2 rounded"></div>
            <span className="text-xs text-[var(--color-dark)]">Resume</span>
          </div>
        </div>
        
        {/* Cards container */}
        <div
          ref={containerRef}
          className="w-full h-full border-2 border-black relative rounded-3xl flex-grow"
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
        </div>
      </div>
    </div>
  );
}