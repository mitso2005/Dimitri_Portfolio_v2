import React, { useState, useEffect, useRef } from 'react';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "React Portfolio",
    image: "https://via.placeholder.com/128x128/3B82F6/FFFFFF?text=React",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    description: "A responsive portfolio website built with React and modern CSS techniques.",
    date: "2024-01",
    link: "https://github.com/yourusername/react-portfolio",
    initialPosition: { x: 50, y: 50 }
  },
  {
    id: 2,
    title: "Java Spring API",
    image: "https://via.placeholder.com/128x128/10B981/FFFFFF?text=Java",
    techStack: ["Java", "Spring Boot", "MySQL"],
    description: "RESTful API backend service with authentication and database integration.",
    date: "2024-02",
    link: "https://github.com/yourusername/spring-api",
    initialPosition: { x: 200, y: 150 }
  },
  {
    id: 3,
    title: "Python Data Analysis",
    image: "https://via.placeholder.com/128x128/F59E0B/FFFFFF?text=Python",
    techStack: ["Python", "Pandas", "Matplotlib"],
    description: "Data visualization and analysis tool for processing large datasets.",
    date: "2023-12",
    link: "https://github.com/yourusername/data-analysis",
    initialPosition: { x: 100, y: 250 }
  }
];

function ProjectCard({ project, containerRef }) {
  const [position, setPosition] = useState(project.initialPosition);
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
    if (window.matchMedia('(max-width: 768px)').matches) {
      return { width: 200, height: 133 };
    }
    return { width: 300, height: 200 };
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
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-xl pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        // Info view (on hover)
        <div className="w-full h-full bg-gradient-to-br from-primary-blue to-primary-pink text-white p-2 flex flex-col justify-between rounded-xl">
          <div>
            <h3 className="text-xs font-bold mb-1 truncate pointer-events-none">
              {project.title}
            </h3>
            <div className="text-xs mb-1 pointer-events-none">
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 2).map((tech, index) => (
                  <span key={index} className="bg-white/20 px-1 py-0.5 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 2 && (
                  <span className="bg-white/20 px-1 py-0.5 rounded text-xs">
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

  return (
    <div className="fixed left-10 right-10 bottom-10 top-60 md:top-80">
      <div
        ref={containerRef}
        className="w-full h-full border-2 border-black relative"
      >
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            containerRef={containerRef}
          />
        ))}
        {/* Test button for .btn-custom */}
        <div className="absolute left-4 bottom-4 z-50">
          <button className="btn-custom" onClick={() => alert('Button clicked!')}>
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}