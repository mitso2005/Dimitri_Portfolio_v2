import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';

export default function Newsletter() {
  return (
    <div>
      <PageNav />
      <h1>Newsletter Page</h1>
      <p>This is the newsletter page.</p>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
