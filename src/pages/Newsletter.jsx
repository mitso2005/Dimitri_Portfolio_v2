import React from 'react';
import Header from '../components/Header.jsx';
import heroImage from '../assets/img/hero_image.svg';
import NewsletterForm from '../components/NewsletterForm.jsx';
import ScrollingImages from '../components/ScrollingImages.jsx';

export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="content">
        <div className="text-left">
          <h2 className="inline">Hey, </h2>
          <h3 className="md:inline">did you know I also make content :)</h3>
        </div>
        <NewsletterForm />
      </div>
      <ScrollingImages position="left" direction="up" />
      <ScrollingImages position="right" direction="down" />
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}