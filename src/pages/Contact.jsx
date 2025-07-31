import React from 'react';
import Header from '../components/Header.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ScrollingImages from '../components/ScrollingImages.jsx';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
      <Header />
      <div className="content">
        <div className="text-left">
          <h2 className="inline">Hey, </h2>
          <h3 className="md:inline">did you know I also make content :)</h3>
        </div>
        <ContactForm />
      </div>
      <ScrollingImages position="left" direction="up" />
      <ScrollingImages position="right" direction="down" />
    </div>
  );
}
