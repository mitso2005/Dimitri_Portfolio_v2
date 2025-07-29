import React from 'react';
import PageNav from '../components/PageNav.jsx';
import DraggableProjectCards from '../components/ProjectCard.jsx'; // Updated import
import { FaReact, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiPython, SiMysql } from 'react-icons/si';
import heroImage from '../assets/img/hero_image.svg';

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageNav />
      <div className="text-center pt-10 pb-10 px-2">
        <h2 className="font-h2-sm">Developer Work</h2>
        <p>
          Discover my coding projects and work experience. Just Hover, Drag and Click to learn more!
        </p>
      </div>
      <div className="flex-1 mx-10 mb-10">
        <DraggableProjectCards />
      </div>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}