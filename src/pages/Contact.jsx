import React from 'react';
import Header from '../components/Header.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ScrollingImages from '../components/ScrollingImages.jsx';
import ContentContainer from '../components/ContentContainer.jsx';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
      <Header />
      <ContentContainer>
        <h2 className="text-left text-4xl sm:text-4xl font-bold fade-in-up delay-100 font-title">
          Contact
        </h2>
        <p className="text-left text-zinc-500 text-xs sm:text-sm fade-in-up delay-200 -mt-2">
          Did you know I make content? Let's create something amazing together.
        </p>
        
        <div className="fade-in-up delay-300">
          <ContactForm />
        </div>
      </ContentContainer>
      
      {/* ScrollingImages components outside the ContentContainer */}
      <ScrollingImages position="left" direction="up" />
      <ScrollingImages position="right" direction="down" />
    </div>
  );
}
