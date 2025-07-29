import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';

export default function About() {
  return (
    <div className = "min-h-screen flex flex-col">
      <PageNav />
      <div className="text-center pt-10 pb-10 px-2">
        <h2 className="font-h2-sm">About Me</h2>
        <p>
          Hi my name's Dimitri
        </p>
      </div>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
