import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';


export default function Contact() {
  return (
    <div>
      <PageNav />
      <h1>Contact Page</h1>
      <p>Hey, did you know that I also make social media content?</p>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
