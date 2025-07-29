import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <div className = "min-h-screen flex flex-col">
      <PageNav />
      <div className="text-center pt-10 pb-10 px-2">
        <h2 className="font-h2-sm">Contact Page</h2>
        <p>Hey, did you know that I also make social media content?</p>
      </div>
      <ContactForm />
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
