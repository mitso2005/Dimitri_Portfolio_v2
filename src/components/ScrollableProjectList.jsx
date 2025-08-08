import React, { useEffect, useRef } from 'react';
import LazyImage from './LazyImage.jsx';
import cissaImage from '../assets/img/projects/cissa.svg';
import githubImage from '../assets/img/projects/github.svg';
import porfoliov1Image from '../assets/img/projects/portfolio_v1.svg';
import portfoliov2Image from '../assets/img/projects/portfolio_v2.svg';
import ytImage from '../assets/img/projects/yt.svg';
import resumeImage from '../assets/img/projects/resume.svg';
import resumePdf from '../assets/pdf/resume.pdf';

// Use the same project data from ProjectCard.jsx
const projectsData = [
  {
    id: 1,
    title: "This Website!",
    image: portfoliov2Image,
    techStack: ["React JS", "Tailwind CSS", "Figma"],
    description: "Check out the github repo to see my full design document made with Figma!",
    date: "Jul. 2025",
    year: 2025,
    type: "project",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v2"
  },
  {
    id: 2,
    title: "My Old React Portfolio",
    image: porfoliov1Image,
    techStack: ["React JS", "Tailwind CSS", "Email Js", "Render"],
    description: "A modern, responsive portfolio template built with React, Tailwind, and EmailJS.",
    date: "Mar. 2025",
    year: 2025,
    type: "project",
    link: "https://github.com/mitso2005/Dimitri_Portfolio_v1"
  },
  {
    id: 5,
    title: "Full Stack Engineer",
    image: cissaImage,
    company: "Computing and Information Systems Students Association (CISSA)",
    techStack: ["Ruby", "Rails", "Figma"],
    description: "Building new components for The Conversation's online news platform.",
    date: "Mar. 2025 - Present",
    year: 2025,
    type: "work",
    link: "https://cissa.org.au/"
  },
  {
    id: 4,
    title: "Web Developer",
    image: ytImage,
    company: "YellaTerra",
    techStack: ["BigCommerce", "SEO", "HTML/CSS"],
    description: "Managing an e-commerce store with over 10k monthly visitors.",
    date: "Apr. 2024 - Present",
    year: 2024,
    type: "work",
    link: "https://store.yellaterra.com.au/"
  },
  {
    id: 3,
    title: "Github",
    image: githubImage,
    techStack: ["React JS", "React Native", "Python", "Ruby", "JavaScript"],
    description: "Check out my other projects on GitHub. I'm currently learning Ruby on Rails and React Native.",
    date: "",
    year: null, // No specific year
    type: "other",
    link: "https://github.com/mitso2005"
  },
  {
    id: 6,
    title: "Resume",
    image: resumeImage,
    description: "Download my resume to learn more about my skills and experience.",
    year: null, // No specific year
    type: "other",
    link: resumePdf
  }
];

// Group projects by year and type
const groupProjects = () => {
  // First, separate by type
  const workExperience = projectsData
    .filter(project => project.type === 'work')
    .sort((a, b) => b.year - a.year);
  
  const projects = projectsData
    .filter(project => project.type === 'project')
    .sort((a, b) => {
      if (!a.year) return 1;
      if (!b.year) return -1;
      return b.year - a.year;
    });
  
  const others = projectsData
    .filter(project => project.type === 'other');

  // Group work experiences by year
  const workExperienceByYear = {};
  workExperience.forEach(item => {
    if (!workExperienceByYear[item.year]) {
      workExperienceByYear[item.year] = [];
    }
    workExperienceByYear[item.year].push(item);
  });

  // Group projects by year
  const projectsByYear = {};
  projects.forEach(item => {
    const year = item.year || 'Other';
    if (!projectsByYear[year]) {
      projectsByYear[year] = [];
    }
    projectsByYear[year].push(item);
  });

  return { workExperienceByYear, projectsByYear, others };
};

// Individual project list item component
const ProjectListItem = ({ project }) => {
  const handleClick = () => {
    if (project.id === 6) {
      // Download resume
      const link = document.createElement('a');
      link.href = project.link;
      link.download = 'Dimitri_Petrakis_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Open in new tab with security attributes
      const link = document.createElement('a');
      link.href = project.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div 
      className="flex flex-col gap-4 hover:bg-[var(--color-light)]/10 rounded-[15px] cursor-pointer transition-all"
      onClick={handleClick}
    >
      <div className="w-full">
        <LazyImage 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-[15px]" // Fixed height for consistent landscape format
        />
      </div>
      <div className="w-full text-left">
        <h4 className="font-semibold text-lg">{project.title}</h4>
        {project.company && (
          <p className="text-sm opacity-75 mb-2">{project.company}</p>
        )}
        {project.date && (
          <p className="text-sm italic mb-2">{project.date}</p>
        )}
        {project.techStack && (
          <div className="flex flex-wrap gap-1 mb-2">
            {project.techStack.map((tech, index) => (
              <span 
                key={index} 
                className="bg-[var(--color-primary-blue)]/20 text-[var(--color-dark)] px-2 py-0.5 rounded-[15px] text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.description && (
          <p className="text-sm">{project.description}</p>
        )}
      </div>
    </div>
  );
};

// Main component
const ScrollableProjectList = () => {
  const scrollRef = useRef(null);
  const { workExperienceByYear, projectsByYear, others } = groupProjects();

  // Set up scroll-based fade effects
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const topHeader = scrollRef.current.querySelectorAll('.fade-scroll-header-top');
      const bottomHeader = scrollRef.current.querySelectorAll('.fade-scroll-header-bottom');
      
      const scrollTop = scrollRef.current.scrollTop;
      const containerHeight = scrollRef.current.clientHeight;
      
      // Handle header fade effect at top
      topHeader.forEach((header) => {
        const opacity = Math.max(0, Math.min(1, scrollTop / 50));
        header.style.opacity = 1 - opacity;
      });
      
      // Handle header fade effect at bottom
      bottomHeader.forEach((header) => {
        const distanceFromBottom = scrollRef.current.scrollHeight - scrollTop - containerHeight;
        const opacity = Math.max(0, Math.min(1, distanceFromBottom / 50));
        header.style.opacity = 1 - opacity;
      });
    };
    
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initialize view
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div 
        ref={scrollRef}
        className="overflow-y-auto custom-scrollbar mt-8"
        style={{ 
          height: 'calc(100vh - 280px)', // Subtract additional 40px from the bottom
          maskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 80px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 80px), transparent 100%)'
        }}
      >

        {/* Work Experience Section */}
        <div className="mb-10 text-left">
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-dark)]">Work Experience</h3>
          
          {Object.entries(workExperienceByYear)
            .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
            .map(([year, items]) => (
              <div key={year} className="mb-8">
                <h4 className="text-lg font-semibold mb-3 border-b border-[var(--color-dark)]/20">
                  {year}
                </h4>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="fade-scroll-item transition-all duration-300">
                      <ProjectListItem project={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Projects Section */}
        <div className="mb-10 text-left">
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-dark)]">Projects</h3>
          
          {Object.entries(projectsByYear)
            .sort(([yearA], [yearB]) => {
              if (yearA === 'Other') return 1;
              if (yearB === 'Other') return -1;
              return parseInt(yearB) - parseInt(yearA);
            })
            .map(([year, items]) => (
              <div key={year} className="mb-8">
                <h4 className="text-lg font-semibold mb-3 border-b border-[var(--color-dark)]/20">
                  {year}
                </h4>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="fade-scroll-item transition-all duration-300">
                      <ProjectListItem project={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Others Section (e.g., Resume) */}
        {others.length > 0 && (
          <div className="mb-10 text-left">
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-dark)]">Other</h3>
            <div className="space-y-4">
              {others.map(item => (
                <div key={item.id} className="fade-scroll-item transition-all duration-300">
                  <ProjectListItem project={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add extra padding at the bottom for better scrolling experience */}
        <div className="h-40"></div> {/* Increased from h-20 to h-40 */}
      </div>
    </div>
  );
};

export default ScrollableProjectList;
