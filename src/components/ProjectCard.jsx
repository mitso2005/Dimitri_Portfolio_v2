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
    title: "React Portfolio",
    image: portfoliov2Image,
    techStack: ["React JS", "Tailwind CSS", "Render"],
    description: "A responsive portfolio website built with React and modern CSS techniques.",
    date: "2024-01",
    link: "https://github.com/yourusername/react-portfolio"
  },
  {
    id: 2,
    title: "Java Spring API",
    image: porfoliov1Image,
    techStack: ["Java", "Spring Boot", "MySQL"],
    description: "RESTful API backend service with authentication and database integration.",
    date: "2024-02",
    link: "https://github.com/yourusername/spring-api"
  },
  {
    id: 3,
    title: "Python Data Analysis",
    image: githubImage,
    techStack: ["Python", "Pandas", "Matplotlib"],
    description: "Data visualization and analysis tool for processing large datasets.",
    date: "2023-12",
    link: "https://github.com/yourusername/data-analysis"
  },
  {
    id: 4,
    title: "Node.js Chat App",
    image: ytImage,
    techStack: ["Node.js", "Socket.io", "Express"],
    description: "A real-time chat application using websockets and Node.js.",
    date: "2023-11",
    link: "https://github.com/yourusername/node-chat-app"
  },
  {
    id: 5,
    title: "Vue E-Commerce",
    image: cissaImage,
    techStack: ["Vue", "Vuex", "Firebase"],
    description: "An e-commerce platform built with Vue and Firebase backend.",
    date: "2023-10",
    link: "https://github.com/yourusername/vue-ecommerce"
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

  const onMouseDown = (e) => {
    if (e.button !== 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();

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
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleClick = (e) => {
    if (!dragging) {
      window.open(project.link, '_blank');
    }
  };

  // Responsive box size
  const getBoxSize = () => {
    if (project.id === 6) {
      return { width: 182, height: 254 };
    }
    return { width: 325, height: 176 };
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

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
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
      `}
    >
      {!isHovered ? (
        // Image view (default state)
        <div className="w-full h-full relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-xl pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />
          <div
            className="absolute left-0 bottom-0 w-full bg-[var(--color-primary-blue)] bg-opacity-90 px-4 rounded-b-xl"
            style={{ zIndex: 2 }}
          >
            <h4
              className="text-[var(--color-light)] text-left m-0"
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
      ) : (
        // Info view (on hover)
        <div className="w-full h-full text-white p-2 flex flex-col justify-between rounded-xl bg-[var(--color-dark)]">
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
      <div
        ref={containerRef}
        className="w-full h-full border-2 border-black relative rounded-3xl"
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
  );
}