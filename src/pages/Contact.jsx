import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageNav />
      <div className="text-left pt-10 px-2">
        <h2 className="inline">Hey, </h2>
        <h3 className="md:inline">I also make content :)</h3>
      </div>
      <ContactForm />
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
