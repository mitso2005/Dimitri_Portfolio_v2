import React from 'react';
import Header from '../components/Header.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ScrollingImages from '../components/ScrollingImages.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import heroImage from '../assets/img/hero_image.svg';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col" >
      <Header />
      <ContentContainer>
        <h2 className="text-left italic text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          contact
        </h2>
        <p className="text-left italic text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2 opacity-50">
          Did you know I make content? Let's create something amazing together.
        </p>
        
        <div className="fade-in-up delay-300">
          <ContactForm />
        </div>
      </ContentContainer>
      <div className="fade-in delay-400">
        {/* ScrollingImages with reduced opacity */}
        <ScrollingImages position="left" direction="down" opacity={0.25} />
        <ScrollingImages position="right" direction="up" opacity={0.25} />
      </div>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-0" />
    </div>
  );
}
